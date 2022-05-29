import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import React from "react";
import { ILocale } from "@/locales";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  locale: ILocale;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  locale,
}) => {
  function onInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const file = evt.target.files![0];
    onFileSelect(file);
  }

  function handleOnSubmit(event: any) {
    event.preventDefault();
  }

  return (
    <>
      <input
        style={{ display: "none" }}
        id="upload-file"
        name="upload-file"
        type="file"
        onChange={onInputChange}
        onSubmit={handleOnSubmit}
      />
      <label htmlFor="upload-file">
        <form>
          <Button color="primary" component="span" variant="contained">
            <UploadFileIcon /> {locale.uploadCSV}
          </Button>
        </form>
      </label>
    </>
  );
};

FileUploader.displayName = "FileUploader";

export default FileUploader;
