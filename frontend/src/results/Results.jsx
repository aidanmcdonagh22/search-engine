import ArrowBack from "@mui/icons-material/ArrowBack"
import {
    Button, Grid, FormControl,
    InputLabel, MenuItem, Select, Pagination
} from '@mui/material';
import { useState } from "react";

const Results = ({ results, count, setSkip, limit, setLimit, back }) => {
    const [page, setPage] = useState(1);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Button variant="outlined" startIcon={<ArrowBack />} onClick={back}>
                    Back
                </Button>
                <FormControl>
                    <InputLabel id="limit-select-label">Limit</InputLabel>
                    <Select
                        labelId="limit-select-label"
                        id="limit-select"
                        value={limit}
                        label="Limit"
                        onChange={e => {
                            e.preventDefault();
                            setLimit(e.target.value);
                        }}
                    >
                        {[0, 10, 25, 50, 100].map(x => <MenuItem value={x}>{x}</MenuItem>)}
                    </Select>
                    </FormControl>
            </Grid>
            {results && results.length > 0 ? results.map(x => <p key={x._id}>{JSON.stringify(x)}</p>) : <p>No results found!</p>}
            <Grid item xs={12}>
                <Pagination
                    count={Math.ceil(+count / limit)}
                    onChange={(e, val) => {
                        e.preventDefault();

                        setPage(val);
                        setSkip(limit * page);
                    }}
                    page={page}
                    variant="outlined"
                />
            </Grid>
        </Grid>
    )
}

export default Results;