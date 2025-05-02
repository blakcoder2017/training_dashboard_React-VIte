const sheetdb = require('../config/sheetdb');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const axios = require('axios');
const { distinctValues } = require('../utils/distinctValues');
const { checkData } = require('../utils/checkData');



exports.getAllData = catchAsync(async (req, res) => {
  const response = await sheetdb.get('/')
  res.status(200).json({
    status: 'success',
    data: response.data
  });
});

exports.distinctFetch = catchAsync(async (req, res, next) => {
  const column = req.params.field; 
  const validColumns = ['district', 'hhid', 'ben_id', 'parent_index', 'community', 'id'];

  if (!validColumns.includes(column)) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Invalid parameter provided. Must be one of the following: district, hhid, ben_id, parent_index, community, id',
    });
  }
  const extractResponse = await sheetdb.get('/');
  if (!extractResponse?.data || !Array.isArray(extractResponse.data)) {
    return res.status(200).json({
      status: 'success',
      data: 0,
    });
  }
  const newExtracts = extractResponse.data.map((item) => item[column]);
  const distinctExtracts = [...new Set(newExtracts)];
  const extractCount = distinctExtracts.length;

  res.status(200).json({
    status: 'success',
    data: {
      count: extractCount,
      values: distinctExtracts,
    },
  });
});

exports.getTimeSeriesData = catchAsync(async (req, res, next) => {
  try{
    const rawData = await sheetdb.get('/');
    
   checkData(rawData);
    //Group data by date
    const trainingMap = {};
    rawData.data.forEach(item => {
      const parsedDate = item.training_date ? new Date(item.training_date).toISOString().split('T')[0] : null;
      const parentIndex = item.parent_index;
    
      if (!parsedDate || !parentIndex) return;
    
      if (!trainingMap[parsedDate]) {
        trainingMap[parsedDate] = new Set();
      }
    
      trainingMap[parsedDate].add(parentIndex);
    });
    
    //convert to time series format
    const timeSeriesData = Object.entries(trainingMap).map(([date, parentIndices]) => ({
      parsed_date: date,
      total_trainings: parentIndices.size,
    }));
  
    res.status(200).json({
      status: 'success',
      data: timeSeriesData,
    });
  }catch(error){
    console.error("Error in getting time series data:", error);
    return next(error); // Pass error to error handler
  }
});

exports.getBenByGender = catchAsync(async (req, res, next) => {
  try{
    const rawData = await sheetdb.get('/');
    checkData(rawData);
    
    const genderMap = {};
    rawData.data.forEach(item => {
      const gender = item.gender;
      const benID = item.ben_id;
      
      if (!gender || !benID) return;

      if (!genderMap[gender]) {
        genderMap[gender] = new Set();
      }
      
      genderMap[gender].add(benID);
    })
    
    const beneficiaryByGender = Object.entries(genderMap).map(([gender, benSet]) => ({
      gender,
      total_beneficiaries: benSet.size
    }));
    
    res.status(200).json({
      status: 'success',
      data: beneficiaryByGender
    });
  }catch(error){
    console.error("Error in getting beneficiaries by gender:", error);
    return next(error); // Pass error to error handler
  }
});

exports.getTrainingByDistrict = catchAsync(async (req, res, next) => {
  try{
    const rawData = await sheetdb.get('/');
    checkData(rawData);
    
    const trainingMap = {};
    rawData.data.forEach(item => {
      const district = item.district;
      const id = item.id;
      
      if (!district || !id) return;

      if (!trainingMap[district]) {
        trainingMap[district] = new Set();
      }
      
      trainingMap[district].add(id);
    })
    
    const trainingByDistrict = Object.entries(trainingMap).map(([district, idSet]) => ({
      district,
      total_beneficiaries: idSet.size
    }));
    
    res.status(200).json({
      status: 'success',
      data: trainingByDistrict
    });
  }catch(error){
    console.error("Error in getting beneficiaries by gender:", error);
    return next(error); // Pass error to error handler
  }
});

exports.getTopicByFreq = catchAsync(async (req, res, next) => {
  try{
    const rawData = await sheetdb.get('/');
    checkData(rawData);
    
    const topicMap = {};
    rawData.data.forEach(item => {
      const topic = item.training_topic;
      const benID = item.ben_id;
      
      if (!topic || !benID) return;

      if (!topicMap[topic]) {
        topicMap[topic] = new Set();
      }
      
      topicMap[topic].add(benID);
    })
    
    const trainingByTopic = Object.entries(topicMap).map(([topic, idSet]) => ({
      topic,
      total_attendance: idSet.size
    }));
    
    res.status(200).json({
      status: 'success',
      data: trainingByTopic
    });
  }catch(error){
    console.error("Error in getting beneficiaries by gender:", error);
    return next(error); // Pass error to error handler
  }
});