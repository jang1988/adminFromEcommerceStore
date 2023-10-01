import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  income.sort((a, b) => a._id - b._id);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Разница в "%"</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">С прошлым месяцом</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Разница в "$"</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">{income[0]?.total}{income[1]?.total - income[0]?.total ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">С прошлым месяцом</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Всего</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[0]?.total + income[1]?.total}</span>
          <span className="featuredMoneyRate">{income[0]?.total}{income[0]?.total ? (
             <ArrowUpward className="featuredIcon" />
            ) : (
             <ArrowDownward className="featuredIcon negative" />
            )}
          </span>
        </div>
        <span className="featuredSub">Весь период</span>
      </div>
    </div>
  );
}
