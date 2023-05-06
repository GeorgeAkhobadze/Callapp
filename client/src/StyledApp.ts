import styled from 'styled-components'

export const App = styled.div<{ darkMode: boolean }>`
    min-height: 100vh;

    ${({ darkMode }) => darkMode && `background-color: ${darkMode ? '#1d1d1d' : '#FFF'};`}
    text-align: center;
`
