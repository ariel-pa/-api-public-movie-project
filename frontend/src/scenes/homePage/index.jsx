import { Box, useMediaQuery, useTheme, InputBase, IconButton } from "@mui/material";
import {
    Search
} from "@mui/icons-material";
import Navbar from "scenes/navbar";
import PeliculaWidget from "scenes/widgests/PeliculaWidget";
import FlexBetween from "components/FlexBetween";
import { useState, useEffect } from "react";
import { getItems } from "helpers/getItems";


const HomePage = () => {
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const isNonMobile = useMediaQuery("(min-width:1000px)");

    const [state, setState] = useState({
        data: [],
        loading: true,
        searchTerm: "",
        error: "",
    });

    const getMovies = async () => {
        const newMovies = await getItems('joker');
        if (newMovies) {
            setState({
                data: newMovies.Search,
                loading: false,
                error: "",
            });
        }
    }

    useEffect(() => {
        getMovies();
    }, [])

    const handleSearch = async () => {
        if (state.searchTerm === "") {
            return setState({ ...state, error: "Por favor, ingresa un texto válido" });
        }

        const newMovies = await getItems(state.searchTerm);

        if (!newMovies.Search) {
            return setState({ ...state, error: "No hay resultados." });
        }

        setState({
            data: newMovies.Search,
            searchTerm: "",
            error: "",
        });
    };

    const { data, loading } = state;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Navbar />
            <Box
                p="2rem 6%"
                textAlign="center"
            >
                <FlexBetween
                    backgroundColor={neutralLight}
                    borderRadius="9px"
                    gap="3rem"
                    padding="0.1rem 1rem"
                >
                    <InputBase
                        placeholder="Buscar..."
                        value={state.searchTerm}
                        onChange={(e) => {
                            setState({ ...state, searchTerm: e.target.value });
                        }}
                        sx={{
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.secondary.main,
                            '&:focus': {
                                borderColor: theme.palette.secondary.dark,
                            },
                        }} />
                    <IconButton onClick={handleSearch}>
                        <Search />
                    </IconButton>
                </FlexBetween>
                <p className="text-white">{state.error ? state.error : ""}</p>
            </Box>

            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                }}
                padding={"2rem 6%"}
            >
                {data.map((movie) => (
                    <PeliculaWidget key={movie.imdbID} {...movie} />
                ))}


            </Box>
        </Box>)
}

export default HomePage;