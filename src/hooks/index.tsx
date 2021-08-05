import { useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const useApiRange = () => {
  const dispatch = useDispatch();

  const sendRequest = useCallback(() => {
    axios.get('http://www.mocky.io/v2/5d4aa9e93300006f000f5ea9')
      .then(function (response) {
        const ranges = {
          revolvingCreditFacility: {
            amountMin: response.data.revolving_credit_facility.amount_min,
            amountMax: response.data.revolving_credit_facility.amount_max,
            durationMin: response.data.revolving_credit_facility.duration_min,
            durationMax: response.data.revolving_credit_facility.duration_max
          },
          businessLoan: {
            amountMin: response.data.business_loan.amount_min,
            amountMax: response.data.business_loan.amount_max,
            durationMin: response.data.business_loan.duration_min,
            durationMax: response.data.business_loan.duration_max
          }
        }
        dispatch({ type: 'apiRange', payload: ranges });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [dispatch])


  return {
    sendRequest
  }

}

export default useApiRange;
