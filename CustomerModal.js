import { Button } from "@material-ui/core";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";

function createData(acno, total_Hits, Last_Hit) {
  return { acno, total_Hits, Last_Hit };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "acno",
    numeric: false,
    disablePadding: false,
    label: "Account",
  },
  {
    id: "total_Hits",
    numeric: false,
    disablePadding: false,
    label: "Total Hits",
  },
  // { id: "name", numeric: false, disablePadding: false, label: "Name" },
  // { id: "address", numeric: false, disablePadding: false, label: "Address" },
  {
    id: "Last_Hit",
    numeric: false,
    disablePadding: false,
    label: "Last Hits",
  },
  // {
  //   id: "email",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Email",
  // },
  // {
  //   id: "ntn",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "NTN",
  // },
  // {
  //   id: "cnic",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "CNIC",
  // },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="bg-[#f5f5fd]">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,

  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function CustomerModal({ show, onHide, acno }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [CustomerApis, setCustomerApis] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchAccount = async (ac) => {
    let newRows = rows;
    const response = await fetch(
      `http://bigazure.com/api/json_v4/dashboard/API_PORTAL_API/api_customerDetail.php`
    ).then((res) => res.json());
    console.log(response.detail);
    console.log()
    if (newRows === []) {
      newRows = [
        createData(
         acno["acno"],
         acno["total_Hits"] === null
            ? "---"
            : a["total_Hits"],
          // response.detail[0]["Name"],
          // response.detail[0]["Address"],
         a["Last_Hit"] === null
            ? "---"
            : a["Last_Hit"]
          // response.detail[0]["Email"],
          // response.detail[0]["NTN"],
          // response.detail[0]["CNIC"]
        ),
      ];
    } else {
      newRows.push(
        createData(
          a["acno"],
          a["total_Hits"] === null
            ? "---"
            :a["total_Hits"],
          // response.detail[0]["Name"],
          // response.detail[0]["Address"],
          a["Last_Hit"] === null
            ? "---"
            : a["Last_Hit"]
          // response.detail[0]["Email"],
          // response.detail[0]["NTN"],
          // response.detail[0]["CNIC"]
        )
      );
    }
    setRows(newRows);
  };
  useEffect(async () => {
    if (acno !== undefined) {
      setIsLoading(true);
      setRows([]);
      let acSplit = [""];
      acSplit = acno.split(",");
      if (acSplit !== undefined) {
        acSplit.map(async (a) => {
          if (a !== "") {
            await fetchAccount(a);
          }
        });
      }
      setIsLoading(false);
    }
  }, [CustomerApis]);

  useEffect(() => {
    console.log("rows", rows);
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Customer Related to this API
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <Paper className={classes.paper}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={"medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover tabIndex={-1} key={row.acno}>
                          <TableCell>{row.acno}</TableCell>
                          <TableCell>{row.total_Hits}</TableCell>
                          {/* <TableCell>{row.name}</TableCell>
                          <TableCell>{row.address}</TableCell> */}
                          <TableCell>{row.Last_Hit}</TableCell>
                          {/* <TableCell>{row.email}</TableCell>
                          <TableCell>{row.ntn}</TableCell>
                          <TableCell>{row.cnic}</TableCell> */}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
