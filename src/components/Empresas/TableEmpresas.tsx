import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDate, formatDateWithHour } from "../../utils/formatDate";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Tooltip, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Empresa } from "../../types/Empresa";

type TableEmpresasProps = {
  data: Empresa[];
  handleClickOpen: (id?: string) => void;
  handleConfirmation: (id?: string) => void;
};

const TableEmpresas: React.FC<TableEmpresasProps> = ({ data, handleClickOpen, handleConfirmation }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(Number(searchParams.get("page")) || 0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(Number(searchParams.get("size")) || 5);

  useEffect(() => {
    const newPage = Number(searchParams.get("page")) || 0;
    const newSize = Number(searchParams.get("size")) || 5;

    setPage(newPage);
    setRowsPerPage(newSize);
  }, [searchParams]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    event?.preventDefault();
    setPage(newPage);
    searchParams.set("page", String(newPage));
    setSearchParams(searchParams);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
    searchParams.set("size", String(newSize));
    searchParams.set("page", "0");
    setSearchParams(searchParams);
  };

  let paginatedRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper className="mt-4 mb-10">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Registro</TableCell>
              <TableCell align="center">Nome Fantasia</TableCell>
              <TableCell align="center">Razão social</TableCell>
              <TableCell align="center">Nº Colaboradores</TableCell>
              <TableCell align="center">Situação</TableCell>
              <TableCell align="center">Última atualização</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{formatDate(row.createdAt)}</TableCell>
                <TableCell align="center">
                  <Tooltip title={row.companyName}>
                    <Typography
                      variant="body2"
                      noWrap
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "400px",
                      }}
                    >
                      {row.companyName}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title={row.name}>
                    <Typography
                      variant="body2"
                      noWrap
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "400px",
                      }}
                    >
                      {row.name}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">{row.collaboratorsCount}</TableCell>
                <TableCell align="center">{row.isActive ? <Chip label="Ativa" color="success" /> : <Chip label="Inativa" color="error" />}</TableCell>
                <TableCell align="center">{formatDateWithHour(row.lastSubmit)}</TableCell>
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

export default TableEmpresas;
