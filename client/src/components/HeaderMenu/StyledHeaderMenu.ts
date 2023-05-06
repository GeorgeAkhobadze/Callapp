import styled from 'styled-components'

export const Header = styled.header<{ darkMode: boolean }>`
    padding: 0px 16px;

    ${({ darkMode }) => darkMode && `background-color: ${darkMode ? '#141414' : '#FFF'};`}

    display: flex;
    justify-content: space-between;

    button {
        align-self: center;
        background-color: red;
    }

    ul {
        flex: auto;
        border-bottom: 0px;
        height: 100%;
    }

    li {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
`
export const SwitchContainer = styled.div`
    color: #fff;

    display: flex;
    gap: 8px;
    align-self: center;
`
