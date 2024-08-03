// Tujuan catchAsync ini yg aku tangkep tuh gini:
/**
 * try{
 * fn(req,res)
 * }catch(error){
 *  next(error)
 * }
 *
 */

// jadi klo misal kondisi try di res ga dapet nanti masuk param next ke catch(error)

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
