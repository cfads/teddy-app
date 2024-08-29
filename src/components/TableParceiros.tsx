import React, { useState } from "react";
import { Parceiro } from "../types/Parceiro";
import { formatDate } from "../utils/formatDate";

import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from "@mui/material";
import Chip from "@mui/material/Chip";

type TableParceirosProps = {
  data: Parceiro[];
};

const TableParceiros: React.FC<TableParceirosProps> = ({ data }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper className="my-10">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Registro</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Git</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Clientes</TableCell>
              <TableCell>Projetos</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.repositoryGit}</TableCell>
                <TableCell>
                  <a href={row.urlDoc} target="_blank">
                    <DescriptionIcon />
                  </a>
                </TableCell>
                <TableCell className="max-w-80">
                  {row.clients?.map((cliente, index) => (
                    <Chip className="m-1" key={index} label={cliente} size="small" />
                  ))}
                </TableCell>
                <TableCell className="max-w-80">
                  {row.projects?.map((project, index) => (
                    <Chip className="m-1" key={index} label={project} size="small" variant="outlined" />
                  ))}
                </TableCell>
                <TableCell>
                  <EditIcon />
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableParceiros;
