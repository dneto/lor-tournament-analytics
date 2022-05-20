import React from "react";
import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
const ExportableCSVGrid = ({ columns, rows, fileName }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            components={{ Toolbar: GridToolbarExport }}
            componentsProps={{
              toolbar: {
                printOptions: { disableToolbarButton: true },
                csvOptions: { fileName: fileName },
              },
            }}
            pageSize={5}
          />
        </div>
      </div>
    </div>
  );
};

ExportableCSVGrid.displayName = "ExportableCSVGrid";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default ExportableCSVGrid;
