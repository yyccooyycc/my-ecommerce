const SectionHeader = ({ title, right }) => {
  return (
    <div className="flex justify-between items-center mb-6 w-full">
      <span className="text-xl font-semibold">{title}</span>
      <div>{right}</div>
    </div>
  );
};

export default SectionHeader;
