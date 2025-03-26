import Container from '@/components/Container';
import HrSelectBtn from './HrSelectBtn';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { HRDeps, HRSpheres } from '@/utils/types';
import { useMemo, useState } from 'react';
import { yearMonthDate } from '@/utils/helper';
import dayjs from 'dayjs';
import useHrStats from '@/hooks/useHrStats';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import ReactDatePicker from 'react-datepicker';
import Loading from '@/components/Loader';
import { Badge } from 'antd';

const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

const HRDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sphere } = useParams();

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    firstDay,
    date,
  ]);
  const [startDate, endDate] = dateRange;

  const { data, isLoading } = useHrStats({
    to_date: dayjs(endDate).format(yearMonthDate),
    from_date: dayjs(startDate).format(yearMonthDate),
    sphere_id: +HRSpheres[sphere! as any],
    enabled: !!endDate && !!startDate && !!sphere,
  });

  const handleNavigate = (url: string) => () =>
    navigate(`/hr-dashboard/${sphere}/${url}`);

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
      text: t('with_category'),
      align: 'left',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              formatter: () => t('total'),
            },
            value: {
              formatter: () => `${donutSeries?.total} ${t('complaint')}`,
            },
          },
        },
      },
    },
    stroke: {
      curve: 'smooth',
    },
    legend: {
      position: 'left',
    },
    chart: {
      type: 'donut',
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
            position: 'bottom',
          },
        },
      },
    ],
  };

  if (!sphere) return;
  if (isLoading) return <Loading />;

  return (
    <>
      <Container className="flex gap-14">
        <HrSelectBtn onClick={handleNavigate(`${HRDeps[HRDeps.qa]}`)}>
          {t('qa')}
        </HrSelectBtn>
        <HrSelectBtn onClick={handleNavigate(`${HRDeps[HRDeps.questions]}`)}>
          <Badge
            showZero
            overflowCount={99}
            count={data?.question_count.new}
            className="absolute top-3 right-3"
            color="#00B333"
          />
          {t('questions')}
        </HrSelectBtn>
        <div className="flex flex-col gap-2 flex-1">
          <HrSelectBtn
            onClick={handleNavigate(`${HRDeps[HRDeps.hr_complaints]}`)}
            className="min-h-24"
          >
            <Badge
              showZero
              overflowCount={99}
              count={data?.complaint_count.new}
              className="absolute top-3 right-3"
              color="#00B333"
            />
            {t('complaints')}
          </HrSelectBtn>
          <HrSelectBtn
            onClick={handleNavigate(`${HRDeps[HRDeps.hr_categories]}`)}
          >
            {t('categories')}
          </HrSelectBtn>
        </div>
        <HrSelectBtn onClick={handleNavigate(`${HRDeps[HRDeps.suggestions]}`)}>
          <Badge
            showZero
            overflowCount={99}
            count={data?.advice_count.new}
            className="absolute top-3 right-3"
            color="#00B333"
          />
          {t('suggestions')}
        </HrSelectBtn>
      </Container>
      <Container className="!mt-1">
        <div className="">
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
          <div className="w-full flex gap-8">
            <Chart
              options={donutOptions}
              series={donutSeries?.series}
              type="donut"
              width="550"
            />

            <div className="flex w-full flex-col">
              <h2 className="font-bold text-sm mb-5">{t('req_stats')}</h2>

              <div className="border flex flex-col gap-4 border-[#00000042] rounded-md py-10 px-5 max-w-[60%] w-full">
                <table className="font-bold text-center">
                  <thead>
                    <tr>
                      <td></td>
                      <td>Поступило</td>
                      <td>Обработано</td>
                      <td>Не обработано</td>
                      <td>Отклонен</td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="text-left">Вопросы</td>
                      <td>{data?.question_count.total || 0}</td>
                      <td>{data?.question_count.finished || 0}</td>
                      <td>{data?.question_count.new || 0}</td>
                      <td>{data?.question_count.rejected || 0}</td>
                    </tr>
                    <tr>
                      <td className="text-left">Жалобы</td>
                      <td>{data?.complaint_count.total || 0}</td>
                      <td>{data?.complaint_count.finished || 0}</td>
                      <td>{data?.complaint_count.new || 0}</td>
                      <td>{data?.complaint_count.rejected || 0}</td>
                    </tr>
                    <tr>
                      <td className="text-left">Предложения</td>
                      <td>{data?.advice_count.total || 0}</td>
                      <td>{data?.advice_count.finished || 0}</td>
                      <td>{data?.advice_count.new || 0}</td>
                      <td>{data?.advice_count.rejected || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HRDashboard;
