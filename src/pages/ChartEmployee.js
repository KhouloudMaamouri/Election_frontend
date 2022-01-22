import { Button, DatePicker, Input, Select } from "antd";
import Form from "antd/lib/form/Form";
import axios from "axios";
import dayjs from "dayjs";
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
const { Option } = Select;
const ChartEmployee = () => {
  const [employeChart, setEmployeChart] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [data, setData] = useState({});
  const [err, setErr] = useState({});
  const componentRef = useRef();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/employee")
      .then((res) => {
        setEmployeeList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  /*   useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/timeSheet/getChartPerEmploye/3/01-01-2022/15-01-2022"
      )
      .then((res) => {
        setEmployeChart(res.data);
      })
      .catch((err) => console.log(err));
  }, []); */

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onChangeStart = (e) => {
    console.log("eee", dayjs(e).format("DD-MM-YYYY"));
    setData({ ...data, start: dayjs(e).format("DD-MM-YYYY") });
  };
  const onChangeFin = (e) => {
    setData({ ...data, fin: dayjs(e).format("DD-MM-YYYY") });
  };
  const handleSlect = (e) => {
    setData({ ...data, employee: e });
  };
  const handleClick = (e) => {
    axios
      .get(
        `http://127.0.0.1:8000/timeSheet/getChartPerEmploye/${data.employee}/${data.start}/${data.fin}`
      )
      .then((res) => {
        setErr(undefined);
        setEmployeChart(res.data);
      })
      .catch((err) => {
        setEmployeChart([]);
        setErr(err);
      });
  };

  console.log("data", data);
  return (
    <div ref={componentRef} className="chartEm">
      <Layout>
        <ReactToPrint
          trigger={() => (
            <button style={{ marginTop: "20px" }}>Print this out!</button>
          )}
          content={() => componentRef.current}
        />
        <h2 style={{ textAlign: "center", padding: "20px 0px" }}>
          L’état mensuel des travaux pour chaque salarié
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: "30px",
              width: "60%",
              justifyContent: "space-between",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <DatePicker placeholder="Start date" onChange={onChangeStart} />
            <DatePicker
              placeholder="Fin date"
              style={{ marginLeft: "20px" }}
              onChange={onChangeFin}
            />
            <Select
              style={{ marginLeft: "20px" }}
              placeholder="Employee"
              className="selectChartEm"
              onChange={handleSlect}
            >
              {employeeList.length !== 0 &&
                employeeList.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.firstName} {item.lastName}
                    </Option>
                  );
                })}
            </Select>
          </div>
          <Button
            disabled={!data.fin || !data.start || !data.employee}
            style={{ width: "27%" }}
            onClick={handleClick}
          >
            Apply
          </Button>
        </div>
        {err && (
          <h1 style={{ textAlign: "center", marginTop: "30px" }}>
            Il n'y a pas de feuille de temps
          </h1>
        )}

        {employeChart.length !== 0 && (
          <ResponsiveContainer height={"70%"} width={"100%"}>
            <BarChart data={employeChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis interval={0} dataKey="date" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="spenTime"
                name="spenTime"
                fill="#BAA6CA"
                barSize={100}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Layout>
    </div>
  );
};

export default ChartEmployee;
