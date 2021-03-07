import { connect } from "mongoose";

const dbConnect = ({ dbUrl }) => {
  if (!dbUrl) {
    throw new Error("Connection error, Database url not found");
  }

  return connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};

export default dbConnect;
