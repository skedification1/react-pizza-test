import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza1, setPizza1] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63427c853f83935a7843d23c.mockapi.io/items/' + id);

        setPizza1(data);
      } catch (error) {
        alert('ERROR get pizza');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza1) {
    return <>'загрузка...'</>;
  }
  return (
    <div className="container">
      <img src={pizza1.imageUrl} />
      <h2>{id}</h2>
      <h2>{pizza1.title}</h2>
      <p></p>
      <h4> {pizza1.price} ₽</h4>
    </div>
  );
};
export default FullPizza;
