import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const Search = ({ onSubmit }) => {
    const [value, setValue] = useState("");
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <form onSubmit={e => {
                    e.preventDefault();
                    onSubmit(value);
                }}>
                    <TextField onChange={e => {
                        e.preventDefault();
                        setValue(e.target.value);
                    }} InputProps={{ endAdornment: <SearchIcon/> }}/>
                </form>
            </Grid>
        </Grid> 
    );
};

export default Search;