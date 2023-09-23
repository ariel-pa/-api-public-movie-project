import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const LoginPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            {/* HEAD */}
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                    sx={{
                        "&:hover": {
                            color: theme.palette.primary.light,
                            cursor: "pointer"
                        }
                    }}
                    onClick={() => navigate(`/`)}
                >
                    {`Volver`}
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "90%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography
                    fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}
                >
                    Iniciar seción
                </Typography>

                {/* FORMULARIO */}
                <Form />

            </Box>
        </Box>
    )
}

export default LoginPage;
