import { Box, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/LanguageSharp";

type ShardPillParams = {
  shard: string;
};

export default function ShardPill({ shard }: ShardPillParams) {
  return (
    <Box
      sx={{
        textAlign: "left",
        alignContent: "center",
        alignSelf: "center",
        display: "flex",
      }}
    >
      <LanguageIcon sx={{ fontSize: "1.2rem", alignSelf: "center" }} />
      <Typography
        fontWeight={700}
        fontSize="0.9rem"
        sx={{ alignSelf: "center", paddingLeft: "2px" }}
      >
        {shard}
      </Typography>
    </Box>
  );
}
