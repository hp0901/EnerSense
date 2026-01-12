const IconPicker = ({ icon, setIcon }) => {
  return (
    <select
      value={icon}
      onChange={(e) => setIcon(e.target.value)}
      className="bg-slate-800 text-white p-2 rounded-md"
    >
      <option value="bulb">💡 Bulb</option>
      <option value="fan">🌀 Fan</option>
      <option value="plug">🔌 Plug</option>
      <option value="ac">❄️ AC</option>
      <option value="heater">🔥 Heater</option>
      <option value="tv">📺 TV</option>
      <option value="fridge">🧊 Fridge</option>
      <option value="washer">🧺 Washer</option>
      <option value="oven">🍳 Oven</option>
      <option value="speaker">🔊 Speaker</option>
      <option value="computer">💻 Computer</option>
      <option value="router">📶 Router</option>
      <option value="washing-machine">🧺 Washing Machine</option>
      <option value="Other">   Other</option>
    </select>
  );
};

export default IconPicker;
