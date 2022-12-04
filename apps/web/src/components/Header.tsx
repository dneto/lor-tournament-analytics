import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Grid, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import TranslateIcon from "@mui/icons-material/Translate";
import GithubIcon from "@mui/icons-material/GitHub";
import { ThemeContext } from "pages/_app";
import { useContext } from "react";

const Header: React.FC = () => {
  const theme = useTheme();
  const context = useContext(ThemeContext);
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        display: "flex",
        marginBottom: "10px",
      }}
    >
      <Box flexGrow={1}>
        <Link href="/">
          <Box
            sx={{
              backgroundColor: theme.palette.text.primary,
              width: "64px",
              height: "64px",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12} paddingBottom={0}>
                <Typography
                  sx={{
                    color: theme.palette.background.default,
                    flexGrow: 1,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    lineHeight: "1.1rem",
                    fontFamily: "Oswald",
                    fontWeight: "800",
                    fontSize: "16px",
                  }}
                >
                  LOR.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: theme.palette.background.default,
                    flexGrow: 1,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    lineHeight: "1.1rem",
                    fontFamily: "Oswald",
                    fontWeight: "800",
                    fontSize: "16px",
                  }}
                >
                  DNE.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: theme.palette.background.default,
                    flexGrow: 1,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    lineHeight: "1.1rem",
                    fontFamily: "Oswald",
                    fontWeight: "800",
                    fontSize: "16px",
                  }}
                >
                  TO
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Link>
      </Box>
      <Box flexGrow={0}>
        <Tooltip title="Discord">
          <a
            rel="noreferrer"
            href="https://discord.gg/f4SFvkCGdY"
            target="_blank"
            style={{
              textDecoration: "inherit",
              color: "inherit",
            }}
          >
            <IconButton sx={{ ml: 1 }} color="inherit">
              <FontAwesomeIcon
                icon={faDiscord}
                style={{
                  fontSize: "24px",
                  width: "24px",
                }}
              />
            </IconButton>
          </a>
        </Tooltip>
        <Tooltip title="GitHub">
          <a
            rel="noreferrer"
            href="https://github.com/dneto/lor-tournament-analytics"
            target="_blank"
            style={{
              textDecoration: "inherit",
              color: "inherit",
            }}
          >
            <IconButton sx={{ ml: 1 }} color="inherit">
              <GithubIcon sx={{ fontSize: "24px" }} />
            </IconButton>
          </a>
        </Tooltip>

        <Tooltip title="Toggle dark/light mode">
          <IconButton
            sx={{ ml: 1, alignSelf: "top", fontSize: "24px" }}
            onClick={() => context.toggleTheme()}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon sx={{ fontSize: "24px" }} />
            ) : (
              <Brightness4Icon sx={{ fontSize: "24px" }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
