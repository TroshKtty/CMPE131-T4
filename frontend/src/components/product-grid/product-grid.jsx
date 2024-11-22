// import PropTypes from "prop-types";

// export default function ProductGrid({ children }) {
//   return (
//     <Grid xs={12} sm={8} md={9} lg={9.5}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <Typography level="h2">
//           {category
//             ? category
//             : query
//             ? `Search Results for "${query}"`
//             : "All Products"}
//         </Typography>
//       </Box>
//       <Grid container gap={4}>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product, idx) => (
//             <ProductCard key={idx} product={product} />
//           ))
//         ) : (
//           <p>Sorry, we couldn&apos;t find any products matching your search.</p>
//         )}
//       </Grid>
//     </Grid>
//   );
// }

// ProductGrid.propTypes = {
//   children: PropTypes.node.isRequired,
// };
