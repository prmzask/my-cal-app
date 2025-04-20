import React, { useState } from "react";

// 各タブのアイテムを定義
const foodItems = [
  { id: 1, name: "あんこ", price: 358, image: "/images/anko.jpg" },
  { id: 2, name: "ジャム", price: 448, image: "/images/jam.jpg" },
  { id: 3, name: "コーヒー", price: 598, image: "/images/coffee.jpg" },
  { id: 4, name: "ちくわ", price: 118, image: "/images/chikuwa.jpg" },
  { id: 4, name: "ソーセージ", price: 408, image: "/images/sausage.jpg" },
  { id: 6, name: "BIG ボロネーゼ", price: 228, image: "/images/big.jpg" },
  { id: 7, name: "プリン", price: 98, image: "/images/purin.jpg" },
  { id: 8, name: "みかんゼリー", price: 129, image: "/images/jerry.jpg" },
  { id: 9, name: "あずきバー", price: 288, image: "/images/azuki.jpg" },
  
];

const seasoningItems = [
  { id: 10, name: "みそ", price: 418, image: "/images/miso.jpg" },
  { id: 11, name: "みりん", price: 318, image: "/images/mirin.jpg" },
  { id: 12, name: "うすくち醤油", price: 338, image: "/images/shoyu.jpg" },
  { id: 13, name: "かき醤油", price: 428, image: "/images/kakishoyu.jpg" },
  { id: 14, name: "旭ポン酢", price: 698, image: "/images/ponzu.jpg" },
  { id: 15, name: "パルメザン", price: 598, image: "/images/cheese.jpg" },
];

const otherItems = [
  { id: 16, name: "洗剤", price: 498, image: "/images/senzai.jpg" },

];

export default function CalApp() {
  const [quantities, setQuantities] = useState({}); // 数量の状態
  const [activeTab, setActiveTab] = useState("food"); // タブの状態管理

  // 数量を変更する関数
  const changeQuantity = (itemId, delta) => {
    setQuantities((prev) => {
      const newQty = (prev[itemId] || 0) + delta;
      return {
        ...prev,
        [itemId]: newQty < 0 ? 0 : newQty,
      };
    });
  };

  // タブごとのアイテムリストを選択
  const items =
    activeTab === "food"
      ? foodItems
      : activeTab === "seasoning"
      ? seasoningItems
      : otherItems;

  // 合計金額を計算
  const total = [...foodItems, ...seasoningItems, ...otherItems].reduce((sum, item) => {
    const quantity = quantities[item.id] || 0;
    return sum + item.price * quantity;
  }, 0);

  // LINEで共有する関数
  const shareLine = () => {
    const selectedItems = [...foodItems, ...seasoningItems, ...otherItems].filter(
      (item) => (quantities[item.id] || 0) > 0
    );
    const list = selectedItems
      .map((item) => `${item.name} ×${quantities[item.id]}　${item.price * quantities[item.id]}円`)
      .join("\n");
    const message = `【おつかいリスト】\n${list}\n計：${total}円`;
    const encoded = encodeURIComponent(message);
    const url = `https://line.me/R/msg/text/?${encoded}`;
    window.open(url);
  };

  return (
    <div className="container">
    <div className="title-wrapper">
    <img src="/images/turu.png" alt="背景装飾" className="title-overlay" />
      <h1>おつかい</h1>

      {/* タブの切り替え部分 */}
      <div className="tabs">
        <button
          onClick={() => setActiveTab("food")}
          className={activeTab === "food" ? "active food-tab" : "food-tab"}
        >
          食品
        </button>
        <button
          onClick={() => setActiveTab("seasoning")}
          className={activeTab === "seasoning" ? "active seasoning-tab" : "seasoning-tab"}
        >
          調味料
        </button>
        <button
          onClick={() => setActiveTab("other")}
          className={activeTab === "other" ? "active other-tab" : "other-tab"}
        >
          その他
        </button>
      </div>

      {/* アイテムリスト */}
      <div className="grid">
        {items.map((item) => {
          const qty = quantities[item.id] || 0;
          return (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-name">{item.name} ({item.price}円)</div>
              <div className="quantity-controls">
                <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                <span style={{ margin: "0 10px" }}>{qty}</span>
                <button onClick={() => changeQuantity(item.id, 1)}>+</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 合計とLINE共有ボタン */}
      <div>
        <div>合計：{total}円</div>
        <button onClick={shareLine} disabled={total === 0}>
          LINEで共有
        </button>
      </div>
    </div>
    </div>
  );
}
