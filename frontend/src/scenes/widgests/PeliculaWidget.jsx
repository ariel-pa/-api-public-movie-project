
import { Box, Typography, Divider, useTheme, Button, Modal } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Constant } from "./../../config";
import { getItemByID } from "helpers/getItems";
import { useNavigate } from "react-router-dom";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const PeliculaWidget = ({ imdbID, Poster, Title }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const theme = useTheme();
    const navigate = useNavigate();
    const dark = theme.palette.neutral.dark;
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState([]);

    const handleOpen = async (imdbID) => {
        setOpen(true);
        const movieData = await getItemByID(imdbID);
        setMovie(movieData);
    }

    const handleClose = () => setOpen(false);

    const addFavoritePelicula = async (imdbID) => {
        const jsonData = {
            id_user: user.id,
            imdbID: imdbID,
        };
        console.log(jsonData);
        const savedMiPelicula = await fetch(
            `${Constant.baseUrl}/mis-peliculas`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            }
        );
        const savedPelicula = await savedMiPelicula.json()
        if (savedPelicula.message) {
            alert(savedPelicula.message);
        } else {
            alert('Película agregada :)');
            navigate("/home");
        }
    }

    return (
        <WidgetWrapper>
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <img
                    style={{ objectFit: "cover" }}
                    width="100%"
                    // height="100%"
                    alt="movie"
                    src={Poster}
                />
            </Box>
            <Box>
                <Typography
                    variant="h4"
                    color={dark}
                    fontWeight="500"
                >
                    {`${Title}`}
                </Typography>
            </Box>

            {/* Modal */}
            <Divider />
            <Box>
                {user ? (
                    <>
                        <Button
                            fullWidth
                            onClick={() => handleOpen(imdbID)}
                            sx={{
                                m: "0.5rem 0",
                                p: "1rem",
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.background.alt,
                                "&:hover": {
                                    color: theme.palette.primary.main
                                },
                            }}
                        >
                            Ver mas
                        </Button>
                        <Button
                            fullWidth
                            onClick={() => addFavoritePelicula(imdbID)}
                            sx={{
                                m: "0.5rem 0",
                                p: "1rem",
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.background.alt,
                                "&:hover": {
                                    color: theme.palette.primary.main
                                },
                            }}
                        >
                            Añadir a mis peliculas
                        </Button>
                    </>
                ) : (
                    <Button
                        fullWidth
                        onClick={() => handleOpen(imdbID)}
                        sx={{
                            m: "0.5rem 0",
                            p: "1rem",
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.alt,
                            "&:hover": {
                                color: theme.palette.primary.main
                            },
                        }}
                    >
                        Ver mas
                    </Button>
                )}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                            <Box sx={{ flex: 1 }}>
                                <img src={movie.Poster} alt="Imagen" style={{ width: '100%' }} />
                            </Box>

                            <Box sx={{ flex: 2, paddingLeft: 2 }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Titúlo: {movie.Title}
                                </Typography>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Año: {movie.Year}
                                </Typography>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Director: {movie.Director}
                                </Typography>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Actores: {movie.Actors}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {movie.Plot}
                                </Typography>
                            </Box>
                        </div>
                        <Divider /><br />

                        {user ? (
                            <>
                                <Button variant="contained" color="primary" onClick={() => addFavoritePelicula(imdbID)}>
                                    Añadir a mis peliculas
                                </Button>
                                <br /><br />

                                <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
                                    Cerrar
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
                                Cerrar
                            </Button>
                        )}
                    </Box>
                </Modal>
            </Box >
        </WidgetWrapper >
    )
};

export default PeliculaWidget;