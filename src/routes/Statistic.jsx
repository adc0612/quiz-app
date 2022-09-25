import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Divider, Typography } from '@mui/material';
import { STORAGE_KEY } from '../utils/storage';
import PieChart from '../components/common/PieChart';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import DataTable from '../components/common/DataTable';

const Statistic = () => {
  const [records, setRecords] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  const [chartData, setChartData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) setRecords(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }, []);
  useEffect(() => {
    let answerCount = 0,
      wrongCount = 0,
      totalCount = 0;
    records?.forEach((obj) => {
      answerCount += Number(obj.answerCount);
      wrongCount += Number(obj.wrongCount);
      totalCount += Number(obj.totalCount);
    });
    setTotalResults({ answerCount, wrongCount, totalCount });
    setChartData({
      labels: ['정답', '오답'],
      datasets: [
        {
          data: [answerCount, wrongCount],
          backgroundColor: ['#81c784', '#e57373'],
        },
      ],
    });
  }, [records]);
  const backToHome = () => navigate('/');
  const deleteRecords = () => {
    localStorage.removeItem(STORAGE_KEY);
    navigate(0);
  };
  const tableHeader = ['번호', '문항 수', '정답 수', '오답 수', '경과시간'];

  return (
    <Box>
      <Typography variant='h4' align='left' mb={1}>
        퀴즈 통계
      </Typography>
      <Divider />
      {records?.length > 0 ? (
        <>
          <Box display='flex' justifyContent='space-between'>
            <Button onClick={backToHome}>
              <HomeIcon style={{ marginRight: '4px' }} />홈 이동
            </Button>
            <Button onClick={deleteRecords}>
              <DeleteIcon style={{ marginRight: '4px' }} />
              기록 삭제
            </Button>
          </Box>
          <Box mb={2}>
            <Typography variant='h5' fontWeight='bold'>
              정답 오답 비율
            </Typography>
            <Typography align='left' fontSize='18px'>
              총 문항: {totalResults?.totalCount}
            </Typography>
            <Typography align='left' fontSize='14px'>
              정답: {totalResults?.answerCount} 개
            </Typography>
            <Typography align='left' fontSize='14px'>
              오답: {totalResults?.wrongCount} 개
            </Typography>
            <PieChart data={chartData} height='300px' />
          </Box>
          <Divider />
          <Box mt={2} mb={2}>
            <Typography variant='h5' fontWeight='bold' mb={2}>
              퀴즈 기록
            </Typography>
            <DataTable label='퀴즈 기록' headers={tableHeader} data={records} />
          </Box>
          <Divider />
        </>
      ) : (
        <Box mt={30}>
          <Typography>퀴즈 결과가 없습니다.</Typography>
          <Box mt={2}>
            <Button onClick={backToHome} variant='contained'>
              <HomeIcon style={{ marginRight: '4px' }} />
              홈으로 돌아가기
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Statistic;
