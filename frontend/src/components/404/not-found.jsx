import { Box, Button, Sheet, Typography } from "@mui/joy";
import { GhostIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<Sheet
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				padding: 3,
				backgroundColor: "background.body",
			}}
		>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				textAlign="center"
				maxWidth={"75%"}
				width={"100%"}
				gap={4}
			>
				<GhostIcon style={{ width: "200px", height: "200px" }} />
				<Typography level="h2">
					Oops! We can&apos;t seem to find the page you&apos;re looking for.
				</Typography>
				<Typography level="body1">
					Please try retyping the address or just head back to our homepage.
				</Typography>
				<Button
					variant="solid"
					color="primary"
					sx={{ borderRadius: "xs" }}
					onClick={() => navigate("/")}
				>
					Back to Homepage
				</Button>
			</Box>
		</Sheet>
	);
}
