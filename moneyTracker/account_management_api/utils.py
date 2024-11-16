from statsmodels.tsa.arima.model import ARIMA

# walk-forward validation
def get_time_series(trns):
    predictions = []
    for t in range(28):
        model = ARIMA(trns, order=(6,1,1))
        model_fit = model.fit()
        output = model_fit.forecast()
        yhat = max(output[0],0)
        predictions.append(yhat)
        trns.append(yhat)
    return predictions