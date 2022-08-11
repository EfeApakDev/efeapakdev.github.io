import { authService } from "@FireBase"
import Image from "next/image"
import { SetStateAction, useState } from "react"
import styled from "styled-components"
import { CustomH2, CustomH4, FlexBox, Margin } from "ui"

type Props = {
  imageDataLength: number
}

const Style = {
  ProfileWrapper: styled.div`
    width: 95%;
    height: 120px;
    border-bottom: 1px solid lightgrey;
  `,
  ProfileImage: styled.img`
    width: 90px;
    height: 90px;
    border-radius: 100px;
  `,
  ProfileEditButton: styled.div`
    width: 250px;
    height: 40px;
    -webkit-appearance: none;
    border: 1px solid lightgrey;
    border-radius: 10px;
    background-color: #4891ff;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
  `,
  ProfileInfoWrapper: styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 1px solid lightgrey;
    display: flex;
    justify-content: space-between;
  `,
  SortToPublic: styled.div`
    cursor: pointer;
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    border-bottom: 3px solid
      ${(props) => (props.about === "public" ? "grey" : "none")};
  `,
  SortToPrivate: styled.div`
    cursor: pointer;
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    border-bottom: 3px solid
      ${(props) => (props.about === "private" ? "grey" : "none")};
  `,
  SortToAll: styled.div`
    cursor: pointer;
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    border-bottom: 3px solid
      ${(props) => (props.about === "all" ? "grey" : "none")};
  `,
}

export default function MobileHeader({ imageDataLength }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      {/* 여기다 팔로워, 팔로잉 리스트 모달 추가하기 */}
      <Style.ProfileWrapper>
        <FlexBox width={"100%"}>
          <Image
            src={
              authService.currentUser?.photoURL
                ? `${authService.currentUser?.photoURL}`
                : "/profile.svg"
            }
            alt="profile"
            width={90}
            height={90}
            style={
              authService.currentUser?.photoURL
                ? { borderRadius: "100px" }
                : { borderRadius: "none" }
            }
          />
          <Margin direction="row" size={15} />
          <FlexBox column={true} width="fit-content">
            <CustomH2>{authService.currentUser?.displayName}</CustomH2>
            <Margin direction="column" size={13} />
            <Style.ProfileEditButton>팔로우</Style.ProfileEditButton>
          </FlexBox>
        </FlexBox>
      </Style.ProfileWrapper>
      <Margin direction="column" size={15} />
      <Style.ProfileInfoWrapper>
        <Style.SortToAll>
          <CustomH4>게시물</CustomH4>
          <CustomH4>{imageDataLength}</CustomH4>
        </Style.SortToAll>
        <Style.SortToPublic>
          <CustomH4>팔로워</CustomH4>
          <CustomH4>{}</CustomH4>
        </Style.SortToPublic>
        <Style.SortToPrivate>
          <CustomH4>팔로우</CustomH4>
          <CustomH4>{}</CustomH4>
        </Style.SortToPrivate>
      </Style.ProfileInfoWrapper>
    </>
  )
}
