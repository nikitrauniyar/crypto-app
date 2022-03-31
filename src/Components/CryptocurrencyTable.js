import { Container, Typography, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, Pagination, createTheme} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CoinList } from '../Config/API';
import { CryptoState } from '../CryptoContext';

const CryptocurrencyTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const {currency}= CryptoState();
    

    const tableHeadRow=["#", "Coin", " ", "Price", "24h", "Market Cap"]

    const navigate=useNavigate();

    const fetchCoins=async ()=>{
        setLoading(true);
        const {data}= await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }


    useEffect(() => {
      fetchCoins()
    }, [currency])

    const useStyles=makeStyles(()=>({
        row:{
            backgroundColor:"#16171a",
            cursor:"pointer",
            "&:hover":{
                backgroundColor:"#131111"
            },
            fontFamily:"Roboto",
            
        },
        pagination:{
            "& .MuiPaginationItem-root":{
                color:"white",
                '&.Mui-selected': {
                    background: 'darkgreen',
                },
            },
            
            
        }
    }))

    const classes=useStyles();

    const numberWithCommas=(number)=> {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    
  return (
      <ThemeProvider theme={darkTheme}>
          <Container style={{textAlign:"left"}}>
            <Typography variant='h5' style={{margin:18, fontWeight:"bold", fontFamily:"Roboto"}}>
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TableContainer>
                {
                    loading ? (
                        <>
                        <Typography style={{color:"white", textAlign:"center"}}>Loading...</Typography>
                        <LinearProgress style={{backgroundColor:'lightgreen'}}/>
                        </>
                    ) : (
                    <>
                        <Table>
                            <TableHead style={{backgroundColor:'black'}}>
                                <TableRow>
                                    {
                                        tableHeadRow.map((head)=>(
                                            <TableCell 
                                                key={head} 
                                                align={head==="Coin" ? "left" : "right"} 
                                                style={{
                                                    color:"grey",
                                                    fontWeight:"700",
                                                    fontFamily:"Roboto"
                                                }}
                                            >
                                                {head}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    coins.slice((page-1)*10, (page-1)*10+10).map((coin)=>{
                                        const profit=coin.price_change_percentage_24h >0;
                                        return(
                                            <TableRow 
                                                onClick={()=>navigate(`/coin/${coin.id}`)}
                                                className={classes.coin}
                                                key={coin.name}
                                             >                                                
                                                <TableCell align="right">
                                                    <Typography style={{color:"white"}}>{coin.market_cap_rank}</Typography>
                                                </TableCell>
                                                <TableCell style={{display:"flex",  alignItems:"left" ,justifyContent:"left"}}>                                                   
                                                    <img src={coin.image} alt={coin.name} height="25" width="25" style={{marginRight:"10px"}} />
                                                    <Typography style={{color:"white", fontWeight:"bold"}}>{coin.name}</Typography>                                                                                                   
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography style={{color:"darkgrey"}}>{coin.symbol.toUpperCase()}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography style={{color:"white"}}>${numberWithCommas(coin.current_price.toFixed(2))}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography style={{color:profit>0 ? "green" :"red"}}>{profit && "+"}{coin.price_change_percentage_24h.toFixed(2)}%</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography style={{color:"darkgrey"}}>${numberWithCommas(coin.market_cap)}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                                
                            </TableBody>

                        </Table>
                    </>
                    )
                }
            </TableContainer>
            <Pagination 
                style={{
                    padding:20,
                    width:"100%",
                    display:"flex",
                    justifyContent:"center"               
                }}
                classes={{ul:classes.pagination}}
                count={(coins?.length/10).toFixed(0)}
                onChange={(e,value)=>{setPage(value)}}
            /> 
            <Typography align='center' style={{color:"white", margin:"20px auto 0"}}>Made by Nikit Rauniyar</Typography>
            
          </Container>
          </ThemeProvider>
  )
}

export default CryptocurrencyTable