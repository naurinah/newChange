// import React from "react";
// import PropTypes from "prop-types";
// import { lighten, makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Paper from "@material-ui/core/Paper";
// import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// import CustomerModal from "./CustomerModal";
// // import {useState} from from "react";

// function createData(no, name, customer) {
//   return {
//     no,
//     name,
//     customer,
//   };
// }

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     id: "no",
//     numeric: false,
//     disablePadding: false,
//     label: "CUSTOMER NO",
//   },
//   { id: "name", numeric: false, disablePadding: false, label: "CUSTOMER NAME" },
//   {
//     id: "customer",
//     numeric: false,
//     disablePadding: false,
//     label: "APIS",
//   },
// ];

// function EnhancedTableHead(props) {
//   const { classes, order, orderBy, rowCount, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead className="bg-[#f5f5fd]">
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             padding={headCell.disablePadding ? "none" : "default"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,

//   onRequestSort: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: "1 1 100%",
//   },
// }));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   paper: {
//     width: "100%",
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     minWidth: 750,
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     top: 20,
//     width: 1,
//   },
// }));

// export default function CustomerTable(customerReload, setCustomerReload) {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("calories");
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [modalShow, setModalShow] = React.useState(false);
//   const [customerApis, setCustomerApis] = React.useState(null);
//   const [rows, setRows] = React.useState([]);
//   const [isLoading, setIsLoading] = React.useState(true);

//   /////////////////////////////////add fetch api///////////////

//   // const rows = [
//   //   createData(
//   //     1,
//   //     "BHV-00036",
//   //     <AddCircleOutlineIcon
//   //       className="cursor-pointer"
//   //       onClick={() => setModalShow(true)}
//   //     />
//   //   ),
//   //   createData(
//   //     1,
//   //     "BHV-00036",
//   //     <AddCircleOutlineIcon
//   //       className="cursor-pointer"
//   //       onClick={() => setModalShow(true)}
//   //     />
//   //   ),
//   //   createData(
//   //     1,
//   //     "BHV-00036",
//   //     <AddCircleOutlineIcon
//   //       className="cursor-pointer"
//   //       onClick={() => setModalShow(true)}
//   //     />
//   //   ),
//   //   createData(
//   //     1,
//   //     "BHV-00036",
//   //     <AddCircleOutlineIcon
//   //       className="cursor-pointer"
//   //       onClick={() => setModalShow(true)}
//   //     />
//   //   ),
//   //   createData(
//   //     1,
//   //     "BHV-00036",
//   //     <AddCircleOutlineIcon
//   //       className="cursor-pointer"
//   //       onClick={() => setModalShow(true)}
//   //     />
//   //   ),
//   //   createData(
//   //     1,
//   //     "BHV-00036",
//   //     <AddCircleOutlineIcon
//   //       className="cursor-pointer"
//   //       onClick={() => setModalShow(true)}
//   //     />
//   //   ),
//   //   createData(
//   //     1,
//   //     "BHV-00036",
//   //     <AddCircleOutlineIcon
//   //       className="cursor-pointer"
//   //       onClick={() => setModalShow(true)}
//   //     />
//   //   ),
//   //   createData(
//   //     1,
//   //     "BHV-00036",
//   //     <AddCircleOutlineIcon
//   //       className="cursor-pointer"
//   //       onClick={() => setModalShow(true)}
//   //     />
//   //   ),
//   //   createData(
//   //     1,
//   //     "BHV-00036",
//   //     <AddCircleOutlineIcon
//   //       className="cursor-pointer"
//   //       onClick={() => setModalShow(true)}
//   //     />
//   //   ),
//   //   createData(
//   //     1,
//   //     "BHV-00036",
//   //     <AddCircleOutlineIcon
//   //       className="cursor-pointer"
//   //       onClick={() => setModalShow(true)}
//   //     />
//   //   ),
//   // ];

//   const fetchCustomerDetails = async () => {
//     const response = await fetch(
//       "https://bigazure.com/api/json_v4/dashboard/API_PORTAL_API/api_detail.php"
//     ).then((res) => res.json());
//     setCustomerApis(response);
//   };

//   const [customerRows, setCustomerRows] = React.useState([]);
//   const [searchedCustomer, setSearchedCustomer] = React.useState("");

//   const CustomerSearch = (searchedVal) => {
//     const filteredRowsNo = customerRows.filter((row) => {
//       return row.no.toLowerCase().includes(searchedVal.toLowerCase());
//     });
//     const filteredRowsName = customerRows.filter((row) => {
//       return row.name.toLowerCase().includes(searchedVal.toLowerCase());
//     });
//     console.log(filteredRowsNo);
//     setRows([...new Set([...filteredRowsNo, ...filteredRowsName])]);
//   };
//   const cancelSearch = () => {
//     setSearchedCustomer("");
//     CustomerSearch(searchedCustomer);
//   };

//   React.useEffect(async () => {
//     if (customerReload) {
//       setIsLoading(true);
//       await fetchCustomerDetails();
//       setIsLoading(false);
//       setCustomerReload(false);
//     }
//   }, [customerReload]);

//   React.useEffect(() => {
//     if (customerApis) {
//       console.log(customerApis);
//       setCustomerRows([]);
//       let newRows = [];
//       customerApis.map((a) => {
//         newRows.push(
//           createData(
//             a["api_no"],
//             a["api_name"],
//             a["api_url"],
//             a["Total Hits"],
//             a["db_name"],
//             a["Alive/Dead"] === "1" ? (
//               <img src="/alive.gif" />
//             ) : (
//               <img src="/dead.png" className="w-[1.5rem]" />
//             ),
//             a["Last Used"],
//             a["server"],
//             a["version"],
//             <AddCircleOutlineIcon
//               className="cursor-pointer"
//               onClick={() => {
//                 setModalAcno(a["acno"]);
//                 setModalShow(true);
//               }}
//             />
//           )
//         );
//       });
//       setRows(newRows);
//       setCustomerRows(newRows);
//       setIsLoading(false);
//     }
//   }, [customerApis]);

//   React.useEffect(async () => {
//     await fetchCustomerDetails();
//   }, []);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const emptyRows =
//     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <TableContainer>
//           <Table
//             className={classes.table}
//             aria-labelledby="tableTitle"
//             size={"medium"}
//             aria-label="enhanced table"
//           >
//             <EnhancedTableHead
//               classes={classes}
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {stableSort(rows, getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow hover tabIndex={-1} key={row.no}>
//                       <TableCell>{row.no}</TableCell>
//                       <TableCell>{row.name}</TableCell>
//                       <TableCell>{row.customer}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: 53 * emptyRows }}>
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onChangePage={handleChangePage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <CustomerModal show={modalShow} onHide={() => setModalShow(false)} />
//     </div>
//   );
// }
