// DonationForm.tsx
'use client'
import { createCheckoutSession } from '@/app/actions/stripe';
import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';

const DonationForm = () => {
  const [amount, setAmount] = useState<string>('');
  const [customAmountVisible, setCustomAmountVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // New state for loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null);



  const handleAmountClick = (selectedAmount: string) => {
    setAmount(selectedAmount);
    setCustomAmountVisible(false);
  };

  const handleCustomClick = () => {
    setAmount('');
    setCustomAmountVisible(true);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true before API call
    try {
      const donationAmount = Number(amount);

      if (isNaN(donationAmount) || donationAmount <= 0) {
        // Handle invalid amount, e.g., show an error message
        setErrorMessage("Invalid donation amount");
        toast.error("Invalid donation amount");
        return
      } 
      await createCheckoutSession(Number(amount))
      // Handle form submission logic here
      console.log('Donation amount:', amount);
      // You can add further logic, like sending the amount to a server or updating state.
    } catch (error:any) {
      // Handle error, maybe show an error message to the user
      // console.error('Error creating checkout session:', error?.message);
      console.error("Error name:", error.message);
      setErrorMessage(error.message);

      toast.error(error.message)

    } finally {
      setLoading(false); // Set loading state to false after API call, whether it succeeds or fails
    }
  };


  return (
    <form onSubmit={handleFormSubmit} className="max-w-md mx-auto mt-8 md:p-6 p-2 bg-gray-100 rounded-md">
      <div className="flex gap-4 justify-evenly content-evenly md:flex-row flex-col  items-center">
        <button
          type="button"
          onClick={() => handleAmountClick('10')}
          className={`py-2 px-4 w-full rounded-md ${amount === '10' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
        >
          $10
        </button>
        <button
          type="button"
          onClick={() => handleAmountClick('20')}
          className={`py-2 px-4 w-full rounded-md ${amount === '20' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
        >
          $20
        </button>
        <button
          type="button"
          onClick={() => handleAmountClick('30')}
          className={`py-2 px-4  w-full rounded-md ${amount === '30' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
        >
          $30
        </button>
        <button
          type="button"
          onClick={() => handleAmountClick('40')}
          className={`py-2 px-4 w-full rounded-md ${amount === '40' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
        >
          $40
        </button>
        <button
          type="button"
          onClick={() => handleCustomClick()}
          className={`py-2 px-4  w-full rounded-md ${customAmountVisible ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
        >
          Custom
        </button>
      </div>

      {customAmountVisible && (
        <label className="block mt-4">
          Enter a custom amount:
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Custom amount"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      )}
     

<button
        type="submit"
        className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-indigo-300 h-[45px]"
        disabled={loading} // Disable the button when loading
      >
        {!loading  && 'Donate'}
        {loading && (
                    <>
                        <svg
                            aria-hidden='true'
                            className={` inline w-[53px] h-[25px] mr-2 text-transparent animate-spin fill-[${ '#38584e'
                            }]`}
                            viewBox='0 0 100 101'
                            // fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                fill='currentColor'
                            />
                            <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                fill='currentFill'
                            />
                        </svg>
                    </>
                )}
      </button>
      {errorMessage && (
        <div className="text-red-500 mt-2 flex justify-center">{errorMessage}</div>
      )}
    </form>
  );
};

export default DonationForm;
