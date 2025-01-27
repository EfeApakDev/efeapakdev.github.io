import { useEffect, useState } from "react"
import { authService, DBService } from "@FireBase"
import { doc, DocumentData, onSnapshot } from "firebase/firestore"
import { GetServerSideProps } from "next"
import ProfileHeader from "@feature/customerProfile"
import styled from "styled-components"
import { CustomH2, FlexBox, Margin } from "ui"
import Layout from "components/layout"
import Image from "next/image"
import { FeedData, UserData } from "backend/dto"
import { useRouter } from "next/router"
import FeedGrid from "@share/Feed/FeedGrid"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { userDataState } from "@share/recoil/recoilList"
import { onAuthStateChanged } from "firebase/auth"
import getUserDataByUid from "lib/getUserDataByUid"

const Style = {
  Wrapper: styled.div`
    width: 100vw;
    height: fit-content;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  `,
}

export default function Profile({ userId }: Props) {
  const router = useRouter()
  const [userData, setUserData] = useState<DocumentData>()
  const [feedData, setFeedData] = useState<FeedData[]>()
  const currentUserData = useRecoilValue(userDataState)

  useEffect(() => {
    if (currentUserData === undefined) return
    if (currentUserData.info.userId === "")
      router.replace(`/loading?path=profile/${userId}`)
  }, [currentUserData])

  useEffect(() => {
    if (router.query !== undefined && router.query.id !== userId)
      router.push(`/profile/${router.query.id}`)
    const userDataRef = doc(DBService, "users", `${userId}`)
    onSnapshot(userDataRef, { includeMetadataChanges: true }, (doc) => {
      if (doc) {
        setUserData(doc.data())
      }
    })
  }, [router.query, userId])
  useEffect(() => {
    if (userData !== undefined) {
      setFeedData(
        userData.feed === undefined ? [] : (userData as UserData).feed,
      )
    }
  }, [userData, router.query])

  return (
    <Layout>
      {userData !== undefined && (
        <Style.Wrapper>
          <ProfileHeader
            imageDataLength={feedData === undefined ? 0 : feedData.length}
            userData={userData as UserData}
          />
          {feedData !== undefined && (
            <FeedGrid feedDatas={feedData ? feedData : undefined} />
          )}
        </Style.Wrapper>
      )}
      <Margin direction="column" size={30} />
    </Layout>
  )
}

type Props = {
  userId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const userId = context.params?.id as string
  return {
    props: {
      userId,
    },
  }
}
