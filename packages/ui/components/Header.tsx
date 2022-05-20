import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Link href={"/"}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
        >
          LoR Analytics
        </Typography>
      </Link>
    </Box>
  );
};

export default Header;
