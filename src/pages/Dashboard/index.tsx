import Container from "@/components/Container";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import useStats from "@/hooks/useStats";
import Loading from "@/components/Loader";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { yearMonthDate } from "@/utils/helper";
import incrementIcon from "/icons/increment.svg";
import decrementIcon from "/icons/decrement.svg";
import incrementGraph from "/icons/incrementGr.svg";
import decrementGraph from "/icons/decrementGr.svg";
import orderQr from "/icons/orderQr.svg";
import orderService from "/icons/orderService.svg";
import orderShop from "/icons/orderShop.svg";
import orderQuality from "/icons/orderQuality.svg";
import cl from "classnames";

const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

const Dashboard = () => {
  const { t } = useTranslation();

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    firstDay,
    date,
  ]);
  const [startDate, endDate] = dateRange;

  const { data, isLoading } = useStats({
    to_date: dayjs(endDate).format(yearMonthDate),
    from_date: dayjs(startDate).format(yearMonthDate),
    enabled: !!endDate && !!startDate,
  });

  const donutSeries = useMemo(() => {
    if (data?.with_categories)
      return {
        series: Object.values(data?.with_categories),
        labels: Object.keys(data?.with_categories),
        total: Object.values(data?.with_categories).reduce(
          (acc, item) => (acc += item),
          0
        ),
      };
  }, [data?.with_categories]);

  const donutOptions: ApexOptions = {
    title: {
      text: t("with_category"),
      align: "left",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              formatter: () => t("total"),
            },
            value: {
              formatter: () => `${donutSeries?.total} ${t("complaint")}`,
            },
          },
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
    legend: {
      position: "left",
    },
    chart: {
      type: "donut",
    },
    labels: donutSeries?.labels,

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const renderLineGraph = useMemo(() => {
    if (data?.monthly_stats) {
      return {
        categories: [
          ...Object.keys({
            ...data.monthly_stats.quality,
            ...data.monthly_stats.service,
          }).reverse(),
        ],
        quality: Object.values(data.monthly_stats.quality).reverse(),
        service: Object.values(data.monthly_stats.service).reverse(),
      };
    }
  }, [data?.monthly_stats]);

  const lineSeries = [
    {
      name: "Сервис",
      data: renderLineGraph?.service!,
    },
    {
      name: "Качество",
      data: renderLineGraph?.quality!,
    },
  ];

  const LineGraphoptions: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "straight",
    },
    legend: { position: "top" },
    title: {
      text: t("complaints"),
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: renderLineGraph?.categories,
    },
  };

  if (isLoading) return <Loading />;

  return (
    <Container className="!bg-transparent">
      <div className="flex gap-4 mb-6">
        <div className="text-[#585562] font-semibold text-sm">
          {t("results")}
        </div>
        <div className="text-[#585562] font-semibold text-sm">
          {t("last_30_days")}
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="flex flex-1 flex-col rounded bg-white p-4">
          <div className="flex items-center mb-4">
            <img src={orderQr} alt="" />
            <h3 className="font-bold ml-3">{t("orders_by_qr")}</h3>
          </div>

          <div className="flex justify-between">
            <div className="flex items-end gap-3">
              <span className="flex items-center gap-2">
                <img
                  src={
                    data?.qrcode_stats?.percentage_change! < 0
                      ? decrementIcon
                      : incrementIcon
                  }
                  alt=""
                />
                <span
                  className={cl(" font-medium text-xs", {
                    ["text-[#0DA06A]"]:
                      data?.qrcode_stats?.percentage_change! > 0,
                    ["text-[#F34A7C]"]:
                      data?.qrcode_stats?.percentage_change! < 0,
                  })}
                >
                  {data?.qrcode_stats?.percentage_change}%
                </span>
              </span>
              <img
                src={
                  data?.qrcode_stats?.percentage_change! < 0
                    ? decrementGraph
                    : incrementGraph
                }
                alt=""
              />
            </div>

            <h3 className="font-semibold text-3xl text-[#737587]">
              {data?.qrcode_stats?.last_30_days}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col rounded bg-white p-4">
          <div className="flex items-center mb-4">
            <img src={orderService} alt="" />
            <h3 className="font-bold ml-3">{t("service")}</h3>
          </div>

          <div className="flex justify-between">
            <div className="flex items-end gap-3">
              <span className="flex items-center gap-2">
                <img
                  src={
                    data?.complaint_service?.percentage_change! < 0
                      ? decrementIcon
                      : incrementIcon
                  }
                  alt=""
                />
                <span
                  className={cl(" font-medium text-xs", {
                    ["text-[#0DA06A]"]:
                      data?.complaint_service?.percentage_change! > 0,
                    ["text-[#F34A7C]"]:
                      data?.complaint_service?.percentage_change! < 0,
                  })}
                >
                  {data?.complaint_service?.percentage_change}%
                </span>
              </span>
              <img
                src={
                  data?.complaint_service?.percentage_change! < 0
                    ? decrementGraph
                    : incrementGraph
                }
                alt=""
              />
            </div>

            <h3 className="font-semibold text-3xl text-[#737587]">
              {data?.complaint_service?.last_30_days}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col rounded bg-white p-4">
          <div className="flex items-center mb-4">
            <img src={orderShop} alt="" />
            <h3 className="font-bold ml-3">{t("service_shop")}</h3>
          </div>

          <div className="flex justify-between">
            <div className="flex items-end gap-3">
              <span className="flex items-center gap-2">
                <img
                  src={
                    data?.workers_comparison?.percentage_change! < 0
                      ? decrementIcon
                      : incrementIcon
                  }
                  alt=""
                />
                <span
                  className={cl(" font-medium text-xs", {
                    ["text-[#0DA06A]"]:
                      data?.workers_comparison?.percentage_change! > 0,
                    ["text-[#F34A7C]"]:
                      data?.workers_comparison?.percentage_change! < 0,
                  })}
                >
                  {data?.workers_comparison?.percentage_change}%
                </span>
              </span>
              <img
                src={
                  data?.workers_comparison?.percentage_change! < 0
                    ? decrementGraph
                    : incrementGraph
                }
                alt=""
              />
            </div>

            <h3 className="font-semibold text-3xl text-[#737587]">
              {data?.workers_comparison?.last_30_days}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col rounded bg-white p-4">
          <div className="flex items-center mb-4">
            <img src={orderQuality} alt="" />
            <h3 className="font-bold ml-3">{t("quality")}</h3>
          </div>

          <div className="flex justify-between">
            <div className="flex items-end gap-3">
              <span className="flex items-center gap-2">
                <img
                  src={
                    data?.complaint_quality?.percentage_change! < 0
                      ? decrementIcon
                      : incrementIcon
                  }
                  alt=""
                />
                <span
                  className={cl(" font-medium text-xs", {
                    ["text-[#0DA06A]"]:
                      data?.complaint_quality?.percentage_change! > 0,
                    ["text-[#F34A7C]"]:
                      data?.complaint_quality?.percentage_change! < 0,
                  })}
                >
                  {data?.complaint_quality?.percentage_change}%
                </span>
              </span>
              <img
                src={
                  data?.complaint_quality?.percentage_change! < 0
                    ? decrementGraph
                    : incrementGraph
                }
                alt=""
              />
            </div>

            <h3 className="font-semibold text-3xl text-[#737587]">
              {data?.complaint_quality?.last_30_days}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex border-t flex-[10] border-t-[#757B846B] mt-6">
        <div className="flex flex-[8] flex-col p-5">
          <ReactDatePicker
            className="!border mb-6 !border-[#0000000F] rounded-lg max-w-80 w-full text-center py-2"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            withPortal
          />
          <div className="flex gap-5">
            <div className="w-full">
              <Chart
                options={donutOptions}
                series={donutSeries?.series}
                type="donut"
                width="550"
              />
            </div>
            <div className="w-full bg-white rounded-2xl p-3">
              <Chart
                options={LineGraphoptions}
                series={lineSeries}
                type="line"
                width={550}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
