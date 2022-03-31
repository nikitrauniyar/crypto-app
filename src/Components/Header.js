import { AppBar, Container, Toolbar, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CryptoState } from '../CryptoContext';
import logo from "./../Images/coingecko.png"

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: 'white',
        fontFamily: "Roboto",
        fontWeight: "bold",
        cursor: "pointer"
    },
}));

const Header = ({ }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const { currency, setCurrency } = CryptoState()

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    // const handleChange=()=>{

    // }
    return (
        <ThemeProvider theme={darkTheme}>
        <>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <img
                            src={logo}
                            alt="Coinpecko"
                            height="40"
                            style={{
                                margin: "20px"
                            }}
                        />
                        <Typography style={{color:"white"}} onClick={() => (navigate("/"))} className={classes.title} variant="h6">
                            CoinPecko
                        </Typography>

                        <Select
                            variant='outlined'
                            style={{
                                width: 100,
                                height: 40,
                                marginRight: 15,
                                color: "white",
                                border: "1px solid white"
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={"AUD"}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        //onChange={handleChange}
                        >
                            <MenuItem value={"AUD"}>AUD</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>
                        </Select>


                    </Toolbar>
                </Container>
            </AppBar>
            </>
        </ThemeProvider>
    )
}

export default Header