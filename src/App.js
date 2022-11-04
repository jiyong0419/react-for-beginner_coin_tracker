import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  const [money, setMoney] = useState(0);
  const [eAMode, setEaMode] = useState(false);
  const [amount, setAmount] = useState(0);

  function onChangeSelect(event) {
    setPrice(event.target.value);
  }
  function onChangeMoney(event) {
    setMoney(event.target.value);
  }
  function onClickChageBtn() {
    setEaMode(!eAMode);
  }
  function onChangeEa(event) {
    setAmount(event.target.value);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCoins(json); // json은 객체를 감싼 배열이고, 빈배열안에 json이들어가는것이아닌 빈배열자리에 json이 대체되는것
        setLoading(false);
        setPrice(Math.floor(json[0].quotes.USD.price * 100000) / 100000);
      });
  }, []); /* url에 data를 요청 > response를 받음 (response는 text) > 받은 text response를 json으로 변경요청 > 받은 json response를 setCoins(json)해서 coins 배열에 담음 */
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onChangeSelect}>
            {coins.map((coin) => {
              return (
                <option value={Math.floor(coin.quotes.USD.price * 100000) / 100000} key={coin.rank}>
                  {`${coin.name} (${coin.symbol}): $${Math.floor(coin.quotes.USD.price * 100000) / 100000} USD`}
                </option>
              );
            })}
          </select>
          <br></br>
          <input onChange={onChangeMoney} value={eAMode ? amount * price : money} disabled={eAMode ? true : false} /> USD
          <br />
          <input onChange={onChangeEa} value={eAMode ? amount : money / price} disabled={eAMode ? false : true} /> EA
          <br />
          <button onClick={onClickChageBtn}>Change</button>
        </div>
      )}
    </div>
  );
}
export default App;

/*
JSX 메모장
🔔  {loading ? <strong>Loading...</strong> : null}
      JSX에서 삼항 조건문을 사용하여 html element를 추가,제거하는법
      loading은 boolean state로써 true가 될수도 있고 false가 될수도 있다.
      추후 null은 

🔔  <strong></strong>은 글씨를 굵게 강조해준다, 웹접근성+스크린리더
  
*/
