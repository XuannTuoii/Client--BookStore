import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import Image from "next/image";
import { useStore } from "../../store";
import { ConfirmDialog } from "primereact/confirmdialog";
import ConvertTime from "./convertTime";

const TableOrder = () => {
  // Start handle Table component
  interface Data {
    orderId: string;
    bookImg: string;
    title: string;
    author: string;
    email: string;
    quantity: number;
    time: string;
  }

  function createData(
    orderId: string,
    bookImg: string,
    title: string,
    author: string,
    email: string,
    quantity: number,
    time: string
  ): Data {
    return {
      orderId,
      bookImg,
      title,
      author,
      email,
      quantity,
      time,
    };
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = "asc" | "desc";

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "bookImg",
      numeric: false,
      disablePadding: true,
      label: "Image",
    },
    {
      id: "title",
      numeric: false,
      disablePadding: false,
      label: "Title",
    },
    {
      id: "author",
      numeric: false,
      disablePadding: false,
      label: "Author",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "quantity",
      numeric: true,
      disablePadding: false,
      label: "Quantity",
    },
    {
      id: "time",
      numeric: false,
      disablePadding: false,
      label: "Time",
    },
  ];

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Data
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  interface EnhancedTableToolbarProps {
    numSelected: number;
  }

  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
          padding: "3.2rem 0",
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{
              flex: "1 1 100%",
              fontSize: "1.6rem",
            }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h3"
            id="tableTitle"
            component="div"
          >
            Order Detail
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon
                sx={{
                  fontSize: "2.4rem",
                }}
                onClick={() => setVisible(true)}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <></>
        )}
      </Toolbar>
    );
  }

  // End handle Table Component
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("title");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { getAllOrder, deleteOrder, user, listOrder } = useStore();
  const [orders, setOrders] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    getAllOrder({
      id: user._id,
    });
  }, []);

  React.useEffect(() => {
    if (listOrder) {
      setOrders(listOrder);
    }
  }, [listOrder]);

  const accept = () => {
    deleteOrder({
      listOrderId: selected,
    });
    getAllOrder({
      id: user._id,
    });
    setSelected([]);
  };

  const rowsData = orders.map((item: any, index: any) => {
    return createData(
      item._id,
      item.bookImg,
      item.bookName,
      item.author,
      item.email,
      item.number,
      item.dateCreateOrder
    );
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rowsData.map((n) => n.orderId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, row: any) => {
    const selectedIndex = selected.indexOf(row.orderId);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.orderId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: any) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsData.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              "& thead": {
                backgroundColor: "#f5f5f5",
                "& th": {
                  backgroundColor: "#89846b",
                  color: "rgb(255, 255, 255)",
                  textAlign: "center",
                  fontSize: "1.6rem",
                  fontWeight: "bold",
                  borderLeft: "1px solid #ccc",
                },
              },
              "& tbody": {
                "& tr": {
                  "& td": {
                    textAlign: "center",
                    fontSize: "1.4rem",
                    borderLeft: "1px solid #ccc",
                  },
                },
              },
            }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsData.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rowsData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.orderId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.orderId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{
                          paddingTop: "0.8rem",
                          "& img": {
                            objectFit: "cover",
                          },
                        }}
                      >
                        <Image
                          src={row.bookImg}
                          width={70}
                          height={70}
                          style={{
                            objectFit: "cover",
                            borderRadius: "0.6rem",
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.author}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">
                        {ConvertTime(row.time)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            padding: "2rem 0 0 0 !important",
            "& .MuiTablePagination-selectLabel": {
              fontSize: "1.4rem",
            },
            "& .MuiInputBase-root": {
              fontSize: "1.4rem",
            },
            "& .MuiTablePagination-displayedRows": {
              fontSize: "1.4rem",
            },
          }}
        />
      </Paper>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Bạn có chắc muốn hủy đơn?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        style={{ fontSize: "1.6rem" }}
      />
    </Box>
  );
};

export default TableOrder;
