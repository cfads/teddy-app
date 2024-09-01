type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="w-11/12 m-auto mt-12 pb-20">{children}</div>;
};

export default Container;
