import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Layout from "../components/layout";

const Home = () => {
  const [terravitis, setTerravitis] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/timeSheet/getChartTerravitis")
      .then((res) => {
        setTerravitis(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div ref={componentRef}>
      <Layout>
        <ReactToPrint
          trigger={() => (
            <button style={{ marginTop: "20px" }}>Print this out!</button>
          )}
          content={() => componentRef.current}
        />
        <h2 style={{ textAlign: "center", padding: "20px 0px" }}>
          L’état des opérations phytosanitaires (état Terravitis)
        </h2>
        {terravitis.length !== 0 && (
          <ResponsiveContainer height={"70%"} width={"100%"}>
            <BarChart data={terravitis}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis interval={0} dataKey="date" stroke="#8884d8" />
              <YAxis scale="point" type="category" />
              <Tooltip />
              <Bar
                dataKey="methode"
                name="Methode"
                fill="#BAA6CA"
                barSize={100}
              />
              {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
          </ResponsiveContainer>
        )}
      </Layout>
    </div>
  );
};

export default Home;
