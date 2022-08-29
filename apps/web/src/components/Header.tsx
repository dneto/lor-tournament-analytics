import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{ flexGrow: 1, backgroundColor: theme.palette.background.default }}
    >
      <Toolbar>
        <Link href="/">
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.primary,
              flexGrow: 1,
              cursor: "pointer",
            }}
          >
            LoR Analytics
          </Typography>
        </Link>
        <a rel="noreferrer" href="https://discord.gg/kPc4HZgK" target="_blank">
          <FontAwesomeIcon
            icon={faDiscord}
            style={{
              color: theme.palette.text.primary,
              margin: "5px",
              fontSize: "24px",
            }}
          />
        </a>
        <a
          rel="noreferrer"
          href="https://github.com/dneto/lor-tournament-analytics"
          target="_blank"
        >
          <FontAwesomeIcon
            icon={faGithub}
            style={{
              color: theme.palette.text.primary,
              margin: "5px",
              fontSize: "24px",
            }}
          />
        </a>
      </Toolbar>
    </Box>
  );
};

export default Header;
