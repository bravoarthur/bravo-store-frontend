import styled from "styled-components";

export const Template = styled.div`
   display: flex;
   flex-direction: column;
   height: 100vh;
`

export const PageContainer = styled.div`
max-width: 1000px;
margin: 0px auto 0px auto;

@media(max-width: 600px) {
    max-width: 350px;
}

`

export const PageTitle = styled.h1`
font-size: 27px
`

export const PageBody = styled.div``

export const ErrorMessage = styled.div `

margin: 10px 0;
background-color: #FFCACA;
color: #000;
border: 2px solid #FF0000;
padding: 10px

`