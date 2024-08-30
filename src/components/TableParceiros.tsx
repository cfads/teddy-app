import React, { useState } from "react";
import { Parceiro } from "../types/Parceiro";
import { formatDate } from "../utils/formatDate";

import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";

type TableParceirosProps = {
  data: Parceiro[];
  handleClickOpen: (id?: string) => void;
  handleConfirmation: (id?: string) => void;
};

const TableParceiros: React.FC<TableParceirosProps> = ({ data, handleClickOpen, handleConfirmation }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let paginatedRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper className="mt-4 mb-10">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Registro</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Git</TableCell>
              <TableCell align="center">Documento</TableCell>
              <TableCell align="center">Clientes</TableCell>
              <TableCell align="center">Projetos</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{formatDate(row.createdAt)}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.repositoryGit}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Abrir Documento" arrow>
                    <a href={row.urlDoc} target="_blank">
                      <DescriptionIcon className="text-gray-400" />
                    </a>
                  </Tooltip>
                </TableCell>
                <TableCell align="center" className="max-w-80">
                  {Array.isArray(row.clients) &&
                    row.clients.map((cliente, index) => <Chip className="m-1" key={index} label={cliente} size="small" />)}
                </TableCell>
                <TableCell align="center" className="max-w-80">
                  {Array.isArray(row.projects) &&
                    row.projects.map((project, index) => <Chip className="m-1" key={index} label={project} size="small" variant="outlined" />)}
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-6 px-4">
                    <Tooltip title="Editar" arrow>
                      <span onClick={() => handleClickOpen(row.id)}>
                        <EditIcon className="cursor-pointer text-yellow-600" />
                      </span>
                    </Tooltip>
                    <Tooltip onClick={() => handleConfirmation(row.id)} title="Remover" arrow>
                      <DeleteIcon className="cursor-pointer text-red-900" />
                    </Tooltip>
                  </div>
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
