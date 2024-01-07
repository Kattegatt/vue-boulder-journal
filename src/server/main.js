const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const routeRouter = require('./routes/route.routes');
const sessionRouter = require('./routes/session.routes');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', routeRouter);
app.use('/api', sessionRouter);

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
