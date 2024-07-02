import express from "express";
import cors from "cors";
import globalErrorhandler from "./app/middleware/globalErrorhandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({origin:`https://mobile-dokan-clinet.vercel.app`, credentials:true}));
// app.use(cors({origin:`https://smartphone-management-client.vercel.app`, credentials:true}));
// app.use(cors({origin:`http://localhost:5173`, credentials:true}));

app.use('/api/v1',router);

app.get("/", (req, res) => {
    res.json({
        title:'Welcome to Smartphone management dashboard api',
        technologiesUsed:{
          ProgrammingLanguage: "TypeScript",
          WebFramework:" Express.js",
          Object_Data_Modeling_and_Validation_Library: "Mongoose for MongoDB",
          Validation: "Zod",
          Middleware: "CORS, Dotenv",
          Linting: "ESLint",
          Code_Formatting: "Prettier",
        },
        description:'',
        author:'Jannatun Nime'
      });
});

//global error handler
app.use(globalErrorhandler);

//not found route
app.use(notFound)

export default app;
