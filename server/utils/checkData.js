exports.checkData = (rawData) => {
if (!rawData || !rawData.data || !Array.isArray(rawData.data)) {
    return res.status(200).json({
      status: 'success',
      data: [], 
    });
  }
}