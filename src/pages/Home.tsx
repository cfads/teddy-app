import Container from "../components/Shared/Container";

const Home = () => {
  return (
    <Container>
      <div className="flex flex-col justify-between gap-8">
        <h1 className="font-bold text-3xl">Bem-vindo ao nosso sistema de gestão de parceiros e empresas externas!</h1>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg px-14 py-10 mt-12 min-h-80 max-w-[800px]">
          <h3 className="text-2xl font-semibold">Sobre o projeto</h3>
          <p className="mt-10">
            Este projeto foi desenvolvido com o objetivo de centralizar e organizar as informações dos parceiros e empresas externas que fazem parte
            das nossas integrações. Com ele, você pode cadastrar, listar e gerenciar essas entidades de forma prática e eficiente. Além disso, a
            aplicação oferece recursos avançados, como a possibilidade de compartilhar tabelas paginadas, garantindo que todos os usuários tenham
            acesso às informações corretas, independentemente de onde pararam na última sessão.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg px-14 py-10 mt-12 min-h-80 max-w-[800px]">
          <h3 className="text-2xl font-semibold">Tecnologias Utilizadas</h3>
          <ul className="list-disc pl-5 space-y-2 my-6 grid grid-cols-3 gap-2">
            <li>React</li>
            <li>Vite</li>
            <li>Angular 15</li>
            <li>Angular Material</li>
            <li>Typescript</li>
            <li>React Query</li>
            <li>Tailwind CSS</li>
            <li>MUI</li>
            <li>Axios</li>
            <li>React Router</li>
            <li>React Icons</li>
          </ul>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg px-14 py-10 mt-12">
        <h3 className="text-2xl font-semibold">Funcionamento do sistema</h3>
        <div className="grid grid-cols-2 mt-10 gap-8">
          <div>
            <h4 className="font-bold">Módulo de Parceiros</h4>
            <p className="mt-4">
              O módulo de Parceiros permite que você gerencie todos os parceiros com os quais a sua empresa tem integrações. O sistema oferece um CRUD
              completo, possibilitando:
            </p>
            <ul className="list-disc pl-5 space-y-2 my-6">
              <li>Cadastrar Parceiro: Adicione novos parceiros ao sistema.</li>
              <li>Listar Parceiros: Visualize todos os parceiros cadastrados em uma tabela paginada.</li>
              <li>Editar Parceiro: Atualize os dados de um parceiro existente conforme necessário.</li>
              <li>Deletar Parceiro: Remova parceiros do sistema de forma segura.</li>
            </ul>
            <p>
              Este módulo é essencial para manter um controle rigoroso sobre as relações de parceria da sua empresa, garantindo que todas as
              informações estejam sempre atualizadas e acessíveis.
            </p>
          </div>
          <div>
            <h4 className="font-bold">Módulo de Empresas</h4>
            <p className="mt-4">
              O módulo de Empresas permite que você gerencie todas as empresas externas associadas à sua empresa. O sistema oferece um CRUD completo,
              possibilitando:
            </p>
            <ul className="list-disc pl-5 space-y-2 my-6">
              <li>Cadastrar Empresa Externa: Adicione novas empresas externas ao sistema.</li>
              <li>Listar Empresas Externas: Visualize todas as empresas externas cadastradas em uma tabela paginada.</li>
              <li>Editar Empresa Externa: Atualize os dados de uma empresa externa existente conforme necessário.</li>
              <li>Deletar Empresa Externa: Remova empresas externas do sistema de forma segura.</li>
            </ul>
            <p>
              Este módulo é crucial para manter um registro organizado das empresas externas com as quais a sua empresa interage, facilitando o
              acompanhamento e a gestão dessas relações.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
