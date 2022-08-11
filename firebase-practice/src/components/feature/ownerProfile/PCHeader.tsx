import { authService } from "@FireBase"
import ProfileEditModal from "@share/ProfileEditModal"
import Image from "next/image"
import { SetStateAction, useState } from "react"
import styled from "styled-components"
import { CustomH2, CustomH3, CustomH4, FlexBox, Margin } from "ui"

type Props = {
  imageDataLength: number
  privateImageDataLength: number
  setPickImageData: React.Dispatch<SetStateAction<"all" | "public" | "private">>
  pickImageData: "all" | "public" | "private"
}

const Style = {
  ProfileHeader: styled.div`
    width: 975px;
    height: 194px;
    border-bottom: 1px solid lightgrey;
    display: flex;
    align-items: center;
    padding-bottom: 44px;
    padding-top: 10px;
  `,
  ProfileInfo: styled.div`
    width: fit-content;
    height: 150px;
    display: flex;
    flex-direction: column;
    padding-top: 15px;
  `,
  ProfileEditButton: styled.div`
    width: 107px;
    height: 30px;
    -webkit-appearance: none;
    border: 2px solid lightgrey;
    border-radius: 10px;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
  `,
  SortWrapper: styled.div`
    width: 600px;
    display: flex;
    height: 60px;
    justify-content: space-between;
  `,
  SortToPublic: styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    border-top: 3px solid
      ${(props) => (props.about === "public" ? "grey" : "none")};
    cursor: pointer;
  `,
  SortToPrivate: styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    border-top: 3px solid
      ${(props) => (props.about === "private" ? "grey" : "none")};
    cursor: pointer;
  `,
  SortToAll: styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    border-top: 3px solid
      ${(props) => (props.about === "all" ? "grey" : "none")};
    cursor: pointer;
  `,
}

export default function PCHeader({
  imageDataLength,
  setPickImageData,
  pickImageData,
  privateImageDataLength,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <ProfileEditModal isOpen={isOpen} setIsOpen={setIsOpen} isPC={true} />
      <Style.ProfileHeader>
        <Margin direction="row" size={80} />
        <Image
          src={
            authService.currentUser?.photoURL
              ? `${authService.currentUser?.photoURL}`
              : "/profile.svg"
          }
          width={150}
          height={150}
          style={
            authService.currentUser?.photoURL
              ? { borderRadius: 150 }
              : { borderRadius: "none" }
          }
          alt="profile"
        />
        <Margin direction="row" size={80} />
        <Style.ProfileInfo>
          <FlexBox alignItems="center">
            <CustomH2>{authService.currentUser?.displayName}</CustomH2>
            <Margin direction="row" size={20} />
            <Style.ProfileEditButton
              onClick={() => {
                setIsOpen(true)
              }}
            >
              프로필 편집
            </Style.ProfileEditButton>
          </FlexBox>
          <Margin direction="column" size={15} />
          <FlexBox>
            <CustomH3>이메일: {authService.currentUser?.email}</CustomH3>
          </FlexBox>
          <Margin direction="column" size={15} />
          {pickImageData === "all" && (
            <CustomH3>게시물: {imageDataLength}</CustomH3>
          )}
          {pickImageData === "public" && (
            <CustomH3>
              공개 게시물: {imageDataLength - privateImageDataLength}
            </CustomH3>
          )}
          {pickImageData === "private" && (
            <CustomH3>비공개 게시물: {privateImageDataLength}</CustomH3>
          )}
        </Style.ProfileInfo>
      </Style.ProfileHeader>
      <Style.SortWrapper>
        <Style.SortToAll
          about={pickImageData}
          onClick={() => {
            setPickImageData("all")
          }}
        >
          <CustomH4>전체 게시물</CustomH4>
          <Image src="/all-file.svg" alt="allFile" width={15} height={15} />
        </Style.SortToAll>
        <Style.SortToPublic
          about={pickImageData}
          onClick={() => {
            setPickImageData("public")
          }}
        >
          <CustomH4>공개 게시물</CustomH4>
          <Image src="/unLock.svg" alt="publicFile" width={15} height={15} />
        </Style.SortToPublic>
        <Style.SortToPrivate
          about={pickImageData}
          onClick={() => {
            setPickImageData("private")
          }}
        >
          <CustomH4>비공개 게시물</CustomH4>
          <Image src="/lock.svg" alt="privateFile" width={15} height={15} />
        </Style.SortToPrivate>
      </Style.SortWrapper>
    </>
  )
}
