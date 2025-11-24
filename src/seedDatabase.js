import AuthService from './features/auth/auth.service.js';
import RecipeService from './features/recipe/recipe.service.js';
import CommentService from './features/comment/comment.service.js';
import FeedbackService from './features/feedback/feedback.service.js';

let isSeeded = false;

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...\n');

    try {
      const testCheck = await AuthService.register({
        name: 'Test Seed Check',
        email: 'seed_check_temp@test.com',
        bio: 'Verificação temporária',
        password: 'temp123',
        username: 'seed_check_temp'
      });

      if (testCheck) {
        console.log('⚠️  Detectado que pode já existir dados. Continuando com seed...\n');
      }
    } catch (error) {
      if (error.message && error.message.includes('já existe')) {
        console.log('⚠️  Banco de dados já contém dados. Abortando seed para evitar duplicação.');
        return;
      }
    }

    // ==================== CRIANDO USUÁRIOS ====================
    console.log('👥 Criando usuários...');
    const users = [];

    const usersData = [
      {
        name: 'Ben Tennyson',
        email: 'ben10@email.com',
        bio: 'amo vitamina do Sr. Sorvete',
        password: '12345678',
        username: 'ben10'
      },
      {
        name: 'Max Tennyson',
        email: 'tennyson@encanadores.com',
        bio: 'Especialista em comida interplanetária',
        password: '12345678',
        username: 'maxtennyson'
      },
      {
        name: 'Subaru Natsuki',
        email: 'subaru@email.com',
        bio: 'Fã de chá',
        password: '12345678',
        username: 'subaru'
      },
      {
        name: 'Cebolácio Júnior',
        email: 'cebolinha@limoeiro.com',
        bio: 'Isso é apenas um de meus planos...',
        password: '12345678',
        username: 'cebolinha'
      },
      {
        name: 'Ryomen Sukuna',
        email: 'sukuna@heian.com',
        bio: 'Rei do churrasco e das carnes da era Heian',
        password: '12345678',
        username: 'sukuna'
      }
    ];

    for (const userData of usersData) {
      try {
        const { user } = await AuthService.register(userData);
        users.push(user);
        console.log(`✅ Usuário criado: ${user.username} (ID: ${user.id})`);
      } catch (error) {
        console.log(`⚠️  Erro ao criar usuário ${userData.username}: ${error.message}`);
      }
    }

    console.log(`\n📊 Total de usuários criados: ${users.length}\n`);

    // ==================== CRIANDO RECEITAS ====================
    console.log('🍳 Criando receitas...');
    const recipes = [];

    const recipesData = [
      {
        data: {
          title: 'Bolo de Chocolate Fofinho',
          description: 'Um delicioso bolo de chocolate super fofinho e úmido',
          image: "https://pt.petitchef.com/imgupl/recipe/bolo-de-chocolate-humido-e-fofinho--lg-454177p704082.webp",
          preparation:
            'Pré-aqueça o forno a 180°C. Unte uma forma com manteiga e farinha. Misture todos os ingredientes secos. Adicione os líquidos e misture até obter uma massa homogênea. Despeje na forma e asse por 40 minutos.',
          portionQuantity: 8,
          portionUnit: 'slice',
          prepTime: 20,
          cookTime: 40,
          authorId: users[0].id
        },
        ingredients: [
          { name: 'Farinha de trigo', quantity: '2', unit: 'cup' },
          { name: 'Açúcar', quantity: '1.5', unit: 'cup' },
          { name: 'Chocolate em pó', quantity: '1', unit: 'cup' },
          { name: 'Ovos', quantity: '3', unit: 'unit' },
          { name: 'Leite', quantity: '1', unit: 'cup' },
          { name: 'Óleo', quantity: '0.5', unit: 'cup' },
          { name: 'Fermento em pó', quantity: '1', unit: 'tablespoon' }
        ],
        categories: ['Sobremesas', 'Bolos']
      },
      {
        data: {
          title: 'Lasanha à Bolonhesa',
          description: 'Lasanha tradicional italiana com molho bolonhesa caseiro',
          image: "https://guiadacozinha.com.br/wp-content/uploads/2014/01/lasanha-bolonhesa-na-pressao.jpg",
          preparation:
            'Prepare o molho bolonhesa refogando carne moída com cebola, alho e tomate. Cozinhe a massa de lasanha. Monte em camadas alternando massa, molho, queijo e presunto. Finalize com queijo ralado e leve ao forno por 30 minutos a 200°C.',
          portionQuantity: 6,
          portionUnit: 'serving',
          prepTime: 40,
          cookTime: 30,
          authorId: users[2].id
        },
        ingredients: [
          { name: 'Massa para lasanha', quantity: '500', unit: 'g' },
          { name: 'Carne moída', quantity: '500', unit: 'g' },
          { name: 'Molho de tomate', quantity: '500', unit: 'ml' },
          { name: 'Queijo mussarela', quantity: '300', unit: 'g' },
          { name: 'Presunto', quantity: '200', unit: 'g' },
          { name: 'Cebola', quantity: '1', unit: 'unit' },
          { name: 'Alho', quantity: '4', unit: 'unit' },
          { name: 'Queijo parmesão ralado', quantity: '100', unit: 'g' }
        ],
        categories: ['Massas', 'Pratos Principais', 'Italiana']
      },
      {
        data: {
          title: 'Salada Caesar Vegana',
          description: 'Versão vegana da clássica salada caesar, super saborosa',
          image: "https://blog.atlantikos.com.br/wp-content/uploads/2023/09/Salada-Caesar-vegana.jpg",
          preparation:
            'Prepare o molho caesar vegano batendo castanhas de caju, alho, mostarda, limão e azeite. Corte a alface romana em pedaços. Prepare croutons torrados. Monte a salada com alface, croutons e molho.',
          portionQuantity: 4,
          portionUnit: 'serving',
          prepTime: 15,
          cookTime: 10,
          authorId: users[3].id
        },
        ingredients: [
          { name: 'Alface romana', quantity: '2', unit: 'unit' },
          { name: 'Castanha de caju', quantity: '1', unit: 'cup' },
          { name: 'Pão integral', quantity: '4', unit: 'slice' },
          { name: 'Alho', quantity: '2', unit: 'unit' },
          { name: 'Limão', quantity: '1', unit: 'unit' },
          { name: 'Mostarda dijon', quantity: '1', unit: 'tablespoon' },
          { name: 'Azeite', quantity: '3', unit: 'tablespoon' }
        ],
        categories: ['Saladas', 'Vegano', 'Saudável']
      },
      {
        data: {
          title: 'Picanha na Brasa',
          description: 'Picanha suculenta preparada na brasa com sal grosso',
          image: "https://i0.wp.com/espetinhodesucesso.com/wp-content/uploads/2021/12/Picanha-na-churrasqueira-1.jpg?resize=800%2C450&ssl=1",
          preparation:
            'Tempere a picanha com sal grosso. Prepare a churrasqueira com carvão em brasa. Coloque a picanha com a gordura para baixo e asse até dourar. Vire e deixe até atingir o ponto desejado. Sirva em fatias.',
          portionQuantity: 8,
          portionUnit: 'serving',
          prepTime: 10,
          cookTime: 45,
          authorId: users[4].id
        },
        ingredients: [
          { name: 'Picanha', quantity: '1.5', unit: 'kg' },
          { name: 'Sal grosso', quantity: '100', unit: 'g' },
          { name: 'Carvão', quantity: '2', unit: 'kg' }
        ],
        categories: ['Churrasco', 'Carnes', 'Pratos Principais']
      },
      {
        data: {
          title: 'Brigadeiro Gourmet',
          description: 'Brigadeiro cremoso e delicioso, perfeito para festas',
          image: "https://harald.com.br/wp-content/uploads/2020/04/briadeirogormet-melken-700x520-1.jpg",
          preparation:
            'Em uma panela, misture leite condensado, manteiga e chocolate em pó. Cozinhe em fogo baixo mexendo sempre até desgrudar do fundo. Deixe esfriar, faça bolinhas e passe no chocolate granulado.',
          portionQuantity: 30,
          portionUnit: 'unit',
          prepTime: 10,
          cookTime: 20,
          authorId: users[1].id
        },
        ingredients: [
          { name: 'Leite condensado', quantity: '395', unit: 'g' },
          { name: 'Manteiga', quantity: '1', unit: 'tablespoon' },
          { name: 'Chocolate em pó', quantity: '3', unit: 'tablespoon' },
          { name: 'Chocolate granulado', quantity: '100', unit: 'g' }
        ],
        categories: ['Sobremesas', 'Doces', 'Festa']
      },
      {
        data: {
          title: 'Risoto de Cogumelos',
          description: 'Risoto cremoso com mix de cogumelos frescos',
          image: "",
          preparation:
            'Refogue cebola e alho no azeite. Adicione o arroz arbóreo e torre levemente. Acrescente vinho branco e deixe evaporar. Adicione caldo aos poucos mexendo sempre. Quando al dente, adicione os cogumelos salteados, manteiga e parmesão.',
          portionQuantity: 4,
          portionUnit: 'serving',
          prepTime: 15,
          cookTime: 30,
          authorId: users[2].id
        },
        ingredients: [
          { name: 'Arroz arbóreo', quantity: '400', unit: 'g' },
          { name: 'Cogumelos variados', quantity: '300', unit: 'g' },
          { name: 'Caldo de legumes', quantity: '1', unit: 'l' },
          { name: 'Vinho branco', quantity: '100', unit: 'ml' },
          { name: 'Queijo parmesão', quantity: '100', unit: 'g' },
          { name: 'Cebola', quantity: '1', unit: 'unit' },
          { name: 'Alho', quantity: '3', unit: 'unit' },
          { name: 'Manteiga', quantity: '50', unit: 'g' }
        ],
        categories: ['Massas', 'Italiana', 'Pratos Principais']
      },
      {
        data: {
          title: 'Smoothie Detox Verde',
          description: 'Smoothie nutritivo e refrescante para começar o dia',
          image: "https://www.boqnews.com/wp-content/uploads/2020/11/risoto.png",
          preparation:
            'Bata todos os ingredientes no liquidificador até obter uma mistura homogênea. Sirva imediatamente bem gelado.',
          portionQuantity: 2,
          portionUnit: 'cup',
          prepTime: 5,
          cookTime: 0,
          authorId: users[3].id
        },
        ingredients: [
          { name: 'Couve', quantity: '2', unit: 'unit' },
          { name: 'Banana', quantity: '1', unit: 'unit' },
          { name: 'Maçã verde', quantity: '1', unit: 'unit' },
          { name: 'Gengibre', quantity: '1', unit: 'slice' },
          { name: 'Limão', quantity: '0.5', unit: 'unit' },
          { name: 'Água de coco', quantity: '300', unit: 'ml' }
        ],
        categories: ['Bebidas', 'Saudável', 'Vegano']
      },
      {
        data: {
          title: 'Torta de Limão',
          description: 'Torta de limão com merengue crocante',
          image: "https://recipesblob.oetker.com.br/assets/d044a4ef3cfe45998593f500c00942ef/964x526/torta-de-limo.webp",
          preparation:
            'Prepare a massa, forre a forma e pré-asse. Faça o recheio de limão cozinhando leite condensado com suco e raspas de limão. Despeje sobre a massa. Faça o merengue batendo claras com açúcar e cubra a torta. Leve ao forno para dourar.',
          portionQuantity: 10,
          portionUnit: 'slice',
          prepTime: 30,
          cookTime: 40,
          authorId: users[1].id
        },
        ingredients: [
          { name: 'Biscoito maisena', quantity: '200', unit: 'g' },
          { name: 'Manteiga', quantity: '100', unit: 'g' },
          { name: 'Leite condensado', quantity: '395', unit: 'g' },
          { name: 'Limão', quantity: '4', unit: 'unit' },
          { name: 'Claras', quantity: '4', unit: 'unit' },
          { name: 'Açúcar', quantity: '8', unit: 'tablespoon' }
        ],
        categories: ['Sobremesas', 'Tortas', 'Festa']
      },
      {
        data: {
          title: 'Panquecas Americanas',
          description: 'Panquecas fofas e deliciosas para o café da manhã',
          image: "https://static.itdg.com.br/images/360-240/34e48b244df56bb8c516375eb418ed45/panqueca-americana.jpg",
          preparation:
            'Misture os ingredientes secos em uma tigela. Em outra tigela, bata os ovos com o leite e a manteiga derretida. Combine as misturas até formar uma massa homogênea. Aqueça uma frigideira antiaderente e despeje porções da massa. Cozinhe até formar bolhas na superfície, vire e doure o outro lado.',
          portionQuantity: 12,
          portionUnit: 'unit',
          prepTime: 10,
          cookTime: 15,
          authorId: users[1].id
        },
        ingredients: [
          { name: 'Farinha de trigo', quantity: '2', unit: 'cup' },
          { name: 'Açúcar', quantity: '2', unit: 'tablespoon' },
          { name: 'Fermento em pó', quantity: '1', unit: 'tablespoon' },
          { name: 'Sal', quantity: '1', unit: 'pinch' },
          { name: 'Ovos', quantity: '2', unit: 'unit' },
          { name: 'Leite', quantity: '1.5', unit: 'cup' },
          { name: 'Manteiga derretida', quantity: '3', unit: 'tablespoon' }
        ],
        categories: ['Café da Manhã', 'Doces']
      },
      {
        data: {
          title: 'Feijoada Completa',
          description: 'Feijoada tradicional brasileira com todas as carnes',
          image: "https://acarnequeomundoprefere.com.br/uploads/media/image/frimesa-receitas-eisbein-1.jpg",
          preparation:
            'Deixe o feijão de molho por 12 horas. Cozinhe as carnes salgadas separadamente para dessalgar. Em uma panela grande, refogue alho e cebola, adicione o feijão e as carnes. Cozinhe em fogo baixo por 2 horas. Ajuste o sal e finalize com cheiro verde.',
          portionQuantity: 10,
          portionUnit: 'serving',
          prepTime: 30,
          cookTime: 150,
          authorId: users[4].id
        },
        ingredients: [
          { name: 'Feijão preto', quantity: '1', unit: 'kg' },
          { name: 'Costela de porco', quantity: '500', unit: 'g' },
          { name: 'Linguiça calabresa', quantity: '400', unit: 'g' },
          { name: 'Bacon', quantity: '200', unit: 'g' },
          { name: 'Paio', quantity: '300', unit: 'g' },
          { name: 'Cebola', quantity: '2', unit: 'unit' },
          { name: 'Alho', quantity: '6', unit: 'unit' },
          { name: 'Louro', quantity: '3', unit: 'unit' },
          { name: 'Cheiro verde', quantity: '1', unit: 'cup' }
        ],
        categories: ['Pratos Principais', 'Brasileira', 'Carnes']
      },
      {
        data: {
          title: 'Sushi Caseiro',
          description: 'Aprenda a fazer sushi tradicional em casa',
          image: "https://static.itdg.com.br/images/360-240/a87acfe3751213889e65df4269045e6e/216008-original.jpg",
          preparation:
            'Cozinhe o arroz e tempere com vinagre de arroz, açúcar e sal. Deixe esfriar. Corte o peixe em tiras finas. Sobre uma esteira de bambu, coloque a alga nori, espalhe o arroz, adicione os recheios e enrole firmemente. Corte em pedaços com uma faca afiada.',
          portionQuantity: 24,
          portionUnit: 'unit',
          prepTime: 45,
          cookTime: 20,
          authorId: users[2].id
        },
        ingredients: [
          { name: 'Arroz para sushi', quantity: '500', unit: 'g' },
          { name: 'Vinagre de arroz', quantity: '100', unit: 'ml' },
          { name: 'Salmão fresco', quantity: '300', unit: 'g' },
          { name: 'Atum fresco', quantity: '200', unit: 'g' },
          { name: 'Pepino japonês', quantity: '2', unit: 'unit' },
          { name: 'Cream cheese', quantity: '150', unit: 'g' },
          { name: 'Alga nori', quantity: '10', unit: 'unit' },
          { name: 'Gergelim', quantity: '2', unit: 'tablespoon' }
        ],
        categories: ['Japonesa', 'Pratos Principais', 'Frutos do Mar']
      },
      {
        data: {
          title: 'Brownies de Chocolate',
          description: 'Brownies densos e chocolatudos, irresistíveis',
          image: "https://static.itdg.com.br/images/360-240/0191a4f23349e54e618a65f2051d68a8/shutterstock-1915577575-2-.jpg",
          preparation:
            'Derreta o chocolate com a manteiga em banho-maria. Bata os ovos com o açúcar até ficar cremoso. Adicione o chocolate derretido e misture. Acrescente a farinha peneirada e misture delicadamente. Despeje em forma untada e asse a 180°C por 25 minutos.',
          portionQuantity: 16,
          portionUnit: 'slice',
          prepTime: 15,
          cookTime: 25,
          authorId: users[1].id
        },
        ingredients: [
          { name: 'Chocolate meio amargo', quantity: '300', unit: 'g' },
          { name: 'Manteiga', quantity: '200', unit: 'g' },
          { name: 'Ovos', quantity: '4', unit: 'unit' },
          { name: 'Açúcar', quantity: '1.5', unit: 'cup' },
          { name: 'Farinha de trigo', quantity: '1', unit: 'cup' },
          { name: 'Cacau em pó', quantity: '3', unit: 'tablespoon' },
          { name: 'Nozes picadas', quantity: '100', unit: 'g' }
        ],
        categories: ['Sobremesas', 'Doces', 'Chocolate']
      },
      {
        data: {
          title: 'Pad Thai',
          description: 'Clássico macarrão tailandês com camarão',
          image: "https://www.recipetineats.com/tachyon/2020/01/Chicken-Pad-Thai_9-SQ.jpg",
          preparation:
            'Deixe o macarrão de arroz de molho em água quente por 15 minutos. Refogue alho e camarão no óleo. Adicione o macarrão escorrido, molho de peixe, tamarindo e açúcar. Misture bem. Adicione ovos mexidos, broto de feijão e amendoim. Finalize com limão e coentro.',
          portionQuantity: 4,
          portionUnit: 'serving',
          prepTime: 20,
          cookTime: 15,
          authorId: users[2].id
        },
        ingredients: [
          { name: 'Macarrão de arroz', quantity: '400', unit: 'g' },
          { name: 'Camarão médio', quantity: '300', unit: 'g' },
          { name: 'Ovos', quantity: '2', unit: 'unit' },
          { name: 'Molho de peixe', quantity: '3', unit: 'tablespoon' },
          { name: 'Tamarindo', quantity: '2', unit: 'tablespoon' },
          { name: 'Amendoim torrado', quantity: '100', unit: 'g' },
          { name: 'Broto de feijão', quantity: '1', unit: 'cup' },
          { name: 'Limão', quantity: '2', unit: 'unit' },
          { name: 'Coentro fresco', quantity: '0.5', unit: 'cup' }
        ],
        categories: ['Tailandesa', 'Massas', 'Frutos do Mar']
      },
      {
        data: {
          title: 'Quiche de Alho-poró',
          description: 'Quiche francês cremoso e delicado',
          image: "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/d6a6f84f954f7f2751faba4d2a7005cb.jpg",
          preparation:
            'Prepare a massa quebradiça e forre a forma. Refogue o alho-poró no azeite até murchar. Bata ovos com creme de leite e tempere. Distribua o alho-poró na massa, despeje o creme e cubra com queijo. Asse a 180°C por 35 minutos até dourar.',
          portionQuantity: 8,
          portionUnit: 'slice',
          prepTime: 25,
          cookTime: 35,
          authorId: users[2].id
        },
        ingredients: [
          { name: 'Massa folhada pronta', quantity: '300', unit: 'g' },
          { name: 'Alho-poró', quantity: '3', unit: 'unit' },
          { name: 'Ovos', quantity: '4', unit: 'unit' },
          { name: 'Creme de leite', quantity: '300', unit: 'ml' },
          { name: 'Queijo gruyere ralado', quantity: '150', unit: 'g' },
          { name: 'Bacon', quantity: '100', unit: 'g' },
          { name: 'Noz-moscada', quantity: '1', unit: 'pinch' }
        ],
        categories: ['Francesa', 'Tortas', 'Pratos Principais']
      },
      {
        data: {
          title: 'Coxinha de Frango',
          description: 'Salgado brasileiro tradicional e irresistível',
          image: "https://guiadacozinha.com.br/wp-content/uploads/2018/08/coxinhadefrangocremosa.webp",
          preparation:
            'Prepare o recheio refogando frango desfiado com temperos. Faça a massa cozinhando água, manteiga e farinha até desgrudar. Deixe esfriar, modele as coxinhas recheadas. Passe no ovo batido e na farinha de rosca. Frite em óleo quente até dourar.',
          portionQuantity: 20,
          portionUnit: 'unit',
          prepTime: 40,
          cookTime: 30,
          authorId: users[0].id
        },
        ingredients: [
          { name: 'Peito de frango', quantity: '500', unit: 'g' },
          { name: 'Farinha de trigo', quantity: '500', unit: 'g' },
          { name: 'Caldo de galinha', quantity: '500', unit: 'ml' },
          { name: 'Manteiga', quantity: '50', unit: 'g' },
          { name: 'Cebola', quantity: '1', unit: 'unit' },
          { name: 'Alho', quantity: '3', unit: 'unit' },
          { name: 'Ovos', quantity: '3', unit: 'unit' },
          { name: 'Farinha de rosca', quantity: '300', unit: 'g' },
          { name: 'Requeijão', quantity: '200', unit: 'g' }
        ],
        categories: ['Salgados', 'Brasileira', 'Festa']
      },
      {
        data: {
          title: 'Mousse de Maracujá',
          description: 'Sobremesa leve e refrescante de maracujá',
          image: "https://static.itdg.com.br/images/360-240/8fed8f60d3c8e3990396e2478cbc7f2a/shutterstock-1905617575-1-.jpg",
          preparation:
            'Bata no liquidificador o suco de maracujá concentrado com leite condensado. Adicione o creme de leite e bata rapidamente. Despeje em taças individuais e leve à geladeira por 4 horas antes de servir.',
          portionQuantity: 6,
          portionUnit: 'cup',
          prepTime: 10,
          cookTime: 0,
          authorId: users[1].id
        },
        ingredients: [
          { name: 'Suco de maracujá concentrado', quantity: '200', unit: 'ml' },
          { name: 'Leite condensado', quantity: '395', unit: 'g' },
          { name: 'Creme de leite', quantity: '300', unit: 'ml' },
          { name: 'Gelatina sem sabor', quantity: '12', unit: 'g' }
        ],
        categories: ['Sobremesas', 'Doces', 'Festa']
      },
      {
        data: {
          title: 'Hambúrguer Artesanal',
          description: 'Hambúrguer suculento feito em casa',
          image: "https://supermercadosrondon.com.br/guiadecarnes/images/postagens/quer_fazer_hamburger_artesanal_perfeito_2019-05-14.jpg",
          preparation:
            'Tempere a carne moída com sal, pimenta e alho. Modele os hambúrgueres sem apertar muito. Grelhe em fogo alto por 3-4 minutos de cada lado. Monte o hambúrguer com pão, alface, tomate, queijo, molhos e os acompanhamentos de sua preferência.',
          portionQuantity: 4,
          portionUnit: 'unit',
          prepTime: 15,
          cookTime: 10,
          authorId: users[4].id
        },
        ingredients: [
          { name: 'Carne moída', quantity: '600', unit: 'g' },
          { name: 'Pão de hambúrguer', quantity: '4', unit: 'unit' },
          { name: 'Queijo cheddar', quantity: '4', unit: 'slice' },
          { name: 'Alface', quantity: '4', unit: 'unit' },
          { name: 'Tomate', quantity: '2', unit: 'unit' },
          { name: 'Cebola roxa', quantity: '1', unit: 'unit' },
          { name: 'Picles', quantity: '8', unit: 'unit' },
          { name: 'Bacon', quantity: '8', unit: 'slice' }
        ],
        categories: ['Lanches', 'Carnes', 'Fast Food']
      },
      {
        data: {
          title: 'Paella Valenciana',
          description: 'Clássico prato espanhol com frutos do mar',
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMjF6YpYbRJZE2Skvkv0BewIWrjF1o4y5zWg&s",
          preparation:
            'Em uma paellera, refogue frango e coelho em azeite. Adicione pimentões, tomate e alho. Acrescente o arroz e torre. Adicione caldo de frutos do mar e açafrão. Disponha camarões, lulas e mexilhões. Cozinhe sem mexer até o arroz absorver o líquido.',
          portionQuantity: 6,
          portionUnit: 'serving',
          prepTime: 30,
          cookTime: 40,
          authorId: users[2].id
        },
        ingredients: [
          { name: 'Arroz para paella', quantity: '500', unit: 'g' },
          { name: 'Frango em pedaços', quantity: '400', unit: 'g' },
          { name: 'Camarão grande', quantity: '300', unit: 'g' },
          { name: 'Lula', quantity: '200', unit: 'g' },
          { name: 'Mexilhões', quantity: '300', unit: 'g' },
          { name: 'Pimentão vermelho', quantity: '2', unit: 'unit' },
          { name: 'Tomate', quantity: '3', unit: 'unit' },
          { name: 'Açafrão', quantity: '1', unit: 'pinch' },
          { name: 'Caldo de peixe', quantity: '1', unit: 'l' }
        ],
        categories: ['Espanhola', 'Frutos do Mar', 'Pratos Principais']
      },
      {
        data: {
          title: 'Cheesecake de Frutas Vermelhas',
          description: 'Cheesecake cremoso com calda de frutas vermelhas',
          image: "https://s2-receitas.glbimg.com/54KiQVGas8DCIiwYqclaakNc1O4=/0x0:1366x768/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2025/3/r/h8urvgQPO8vv1nWSPy3A/cheesecake-de-frutas-vermelhas.jpg",
          preparation:
            'Triture biscoitos e misture com manteiga para a base. Bata cream cheese com açúcar, ovos e baunilha. Despeje sobre a base e asse em banho-maria a 160°C por 50 minutos. Deixe esfriar completamente. Prepare a calda fervendo frutas vermelhas com açúcar. Sirva gelado.',
          portionQuantity: 12,
          portionUnit: 'slice',
          prepTime: 30,
          cookTime: 50,
          authorId: users[1].id
        },
        ingredients: [
          { name: 'Biscoito maisena', quantity: '250', unit: 'g' },
          { name: 'Manteiga', quantity: '100', unit: 'g' },
          { name: 'Cream cheese', quantity: '600', unit: 'g' },
          { name: 'Açúcar', quantity: '1', unit: 'cup' },
          { name: 'Ovos', quantity: '3', unit: 'unit' },
          { name: 'Essência de baunilha', quantity: '1', unit: 'teaspoon' },
          { name: 'Frutas vermelhas mistas', quantity: '300', unit: 'g' }
        ],
        categories: ['Sobremesas', 'Tortas', 'Festa']
      },
      {
        data: {
          title: 'Curry Tailandês de Frango',
          description: 'Curry aromático e cremoso com leite de coco',
          image: "https://caldobom.com.br/wp-content/uploads/2024/05/47ce69d8e69f0c45c57a210720de7d181645798616.png",
          preparation:
            'Refogue pasta de curry em óleo até perfumar. Adicione frango em cubos e doure. Acrescente leite de coco, molho de peixe e açúcar mascavo. Adicione legumes e cozinhe até ficarem macios. Finalize com folhas de manjericão tailandês. Sirva com arroz.',
          portionQuantity: 4,
          portionUnit: 'serving',
          prepTime: 20,
          cookTime: 25,
          authorId: users[2].id
        },
        ingredients: [
          { name: 'Peito de frango', quantity: '500', unit: 'g' },
          { name: 'Pasta de curry vermelho', quantity: '3', unit: 'tablespoon' },
          { name: 'Leite de coco', quantity: '400', unit: 'ml' },
          { name: 'Berinjela', quantity: '1', unit: 'unit' },
          { name: 'Pimentão', quantity: '1', unit: 'unit' },
          { name: 'Molho de peixe', quantity: '2', unit: 'tablespoon' },
          { name: 'Açúcar mascavo', quantity: '1', unit: 'tablespoon' },
          { name: 'Manjericão tailandês', quantity: '0.5', unit: 'cup' }
        ],
        categories: ['Tailandesa', 'Pratos Principais', 'Carnes']
      },
      {
        data: {
          title: 'Tiramisù Autêntico',
          description: 'Sobremesa italiana clássica com café e mascarpone',
          image: "https://i.ytimg.com/vi/UNRwY7wkn-g/maxresdefault.jpg",
          preparation:
            'Bata gemas com açúcar até ficar claro. Adicione mascarpone e misture. Bata claras em neve e incorpore delicadamente. Mergulhe biscoitos champagne no café rapidamente. Monte camadas de biscoito e creme. Finalize com cacau em pó. Refrigere por 6 horas.',
          portionQuantity: 8,
          portionUnit: 'serving',
          prepTime: 30,
          cookTime: 0,
          authorId: users[2].id
        },
        ingredients: [
          { name: 'Mascarpone', quantity: '500', unit: 'g' },
          { name: 'Ovos', quantity: '6', unit: 'unit' },
          { name: 'Açúcar', quantity: '150', unit: 'g' },
          { name: 'Biscoito champagne', quantity: '300', unit: 'g' },
          { name: 'Café expresso', quantity: '300', unit: 'ml' },
          { name: 'Licor de café', quantity: '50', unit: 'ml' },
          { name: 'Cacau em pó', quantity: '3', unit: 'tablespoon' }
        ],
        categories: ['Sobremesas', 'Italiana', 'Doces']
      },
      {
        data: {
          title: 'Tacos Mexicanos',
          description: 'Tacos autênticos com carne temperada e guacamole',
          image: "https://static.itdg.com.br/images/640-440/763a97fad5636232d9ffe30955b44acf/347923-original.jpg",
          preparation:
            'Tempere a carne moída com cominho, páprica e pimenta. Refogue até dourar. Prepare guacamole amassando abacate com limão, coentro e cebola. Aqueça as tortilhas. Monte os tacos com carne, guacamole, queijo, alface, tomate e molho picante.',
          portionQuantity: 8,
          portionUnit: 'unit',
          prepTime: 20,
          cookTime: 15,
          authorId: users[4].id
        },
        ingredients: [
          { name: 'Carne moída', quantity: '500', unit: 'g' },
          { name: 'Tortilhas de milho', quantity: '8', unit: 'unit' },
          { name: 'Abacate', quantity: '2', unit: 'unit' },
          { name: 'Tomate', quantity: '2', unit: 'unit' },
          { name: 'Cebola', quantity: '1', unit: 'unit' },
          { name: 'Queijo cheddar ralado', quantity: '150', unit: 'g' },
          { name: 'Alface', quantity: '0.5', unit: 'unit' },
          { name: 'Limão', quantity: '2', unit: 'unit' },
          { name: 'Coentro', quantity: '0.5', unit: 'cup' }
        ],
        categories: ['Mexicana', 'Lanches', 'Carnes']
      },
      {
        data: {
          title: 'Pão de Queijo Mineiro',
          description: 'Tradicional pão de queijo brasileiro',
          image: "https://static.itdg.com.br/images/1200-630/dfc5a3f918dc30f32747b44cd3a18712/pao-de-queijo-facil-e-delicioso-3-.jpg",
          preparation:
            'Ferva leite, óleo e sal. Despeje sobre o polvilho e misture bem. Deixe amornar. Adicione ovos e queijo ralado, misture até ficar homogêneo. Modele bolinhas com as mãos untadas com óleo. Disponha em assadeira e asse a 180°C por 25 minutos até dourar.',
          portionQuantity: 30,
          portionUnit: 'unit',
          prepTime: 20,
          cookTime: 25,
          authorId: users[0].id
        },
        ingredients: [
          { name: 'Polvilho azedo', quantity: '500', unit: 'g' },
          { name: 'Leite', quantity: '250', unit: 'ml' },
          { name: 'Óleo', quantity: '100', unit: 'ml' },
          { name: 'Ovos', quantity: '3', unit: 'unit' },
          { name: 'Queijo meia cura ralado', quantity: '200', unit: 'g' },
          { name: 'Sal', quantity: '1', unit: 'teaspoon' }
        ],
        categories: ['Brasileira', 'Pães', 'Café da Manhã']
      },
      {
        data: {
          title: 'Ramen Tradicional',
          description: 'Sopa japonesa com macarrão e caldo rico',
          image: "https://guiadacozinha.com.br/wp-content/uploads/2023/03/lamen-tradicional.jpg",
          preparation:
            'Prepare o caldo fervendo ossos de porco por 8 horas. Cozinhe o macarrão ramen. Prepare chashu marinando e assando barriga de porco. Cozinhe ovos mollet. Monte a tigela com caldo, macarrão, fatias de chashu, ovo, alga nori e cebolinha.',
          portionQuantity: 4,
          portionUnit: 'bowl',
          prepTime: 30,
          cookTime: 480,
          authorId: users[2].id
        },
        ingredients: [
          { name: 'Macarrão ramen', quantity: '400', unit: 'g' },
          { name: 'Barriga de porco', quantity: '500', unit: 'g' },
          { name: 'Ossos de porco', quantity: '1', unit: 'kg' },
          { name: 'Ovos', quantity: '4', unit: 'unit' },
          { name: 'Alga nori', quantity: '4', unit: 'unit' },
          { name: 'Cebolinha', quantity: '0.5', unit: 'cup' },
          { name: 'Shoyu', quantity: '4', unit: 'tablespoon' },
          { name: 'Missô', quantity: '2', unit: 'tablespoon' },
          { name: 'Gengibre', quantity: '30', unit: 'g' }
        ],
        categories: ['Japonesa', 'Sopas', 'Pratos Principais']
      },
      {
        data: {
          title: 'Crème Brûlée',
          description: 'Sobremesa francesa clássica com casquinha caramelizada',
          image: "https://static.itdg.com.br/images/1200-630/ea0e2106d877aba6e2f1fe98f14cc378/319490-original.jpg",
          preparation:
            'Bata gemas com açúcar. Aqueça creme de leite com baunilha e despeje sobre as gemas mexendo. Passe por peneira. Distribua em ramequins e asse em banho-maria a 150°C por 40 minutos. Refrigere por 4 horas. Polvilhe açúcar e caramelize com maçarico.',
          portionQuantity: 6,
          portionUnit: 'unit',
          prepTime: 20,
          cookTime: 40,
          authorId: users[1].id
        },
        ingredients: [
          { name: 'Creme de leite fresco', quantity: '500', unit: 'ml' },
          { name: 'Gemas', quantity: '6', unit: 'unit' },
          { name: 'Açúcar', quantity: '100', unit: 'g' },
          { name: 'Fava de baunilha', quantity: '1', unit: 'unit' },
          { name: 'Açúcar cristal', quantity: '6', unit: 'tablespoon' }
        ],
        categories: ['Sobremesas', 'Francesa', 'Doces']
      },
      {
        data: {
          title: 'Strogonoff de Carne',
          description: 'Clássico strogonoff brasileiro cremoso',
          image: "https://static.itdg.com.br/images/640-440/01cce72884e70c534d6f422cdd06c110/estrogonofe-de-carne.jpg",
          preparation:
            'Corte a carne em tiras e tempere. Doure a carne em manteiga e reserve. Na mesma panela, refogue cebola e alho. Adicione cogumelos, molho de tomate e mostarda. Volte a carne, adicione creme de leite e ajuste o sal. Sirva com arroz e batata palha.',
          portionQuantity: 6,
          portionUnit: 'serving',
          prepTime: 20,
          cookTime: 25,
          authorId: users[4].id
        },
        ingredients: [
          { name: 'Filé mignon', quantity: '700', unit: 'g' },
          { name: 'Cogumelos fatiados', quantity: '200', unit: 'g' },
          { name: 'Creme de leite', quantity: '400', unit: 'ml' },
          { name: 'Molho de tomate', quantity: '300', unit: 'ml' },
          { name: 'Mostarda', quantity: '2', unit: 'tablespoon' },
          { name: 'Cebola', quantity: '1', unit: 'unit' },
          { name: 'Alho', quantity: '4', unit: 'unit' },
          { name: 'Manteiga', quantity: '50', unit: 'g' }
        ],
        categories: ['Pratos Principais', 'Brasileira', 'Carnes']
      },
      {
        data: {
          title: 'Açaí Bowl',
          description: 'Tigela de açaí nutritiva e refrescante',
          image: "https://healthfulblondie.com/wp-content/uploads/2022/06/Homemade-Healthy-Protein-Acai-Bowl-6.jpg",
          preparation:
            'Bata no liquidificador polpa de açaí congelada com banana e um pouco de água até obter consistência cremosa. Despeje em uma tigela. Decore com granola, frutas fatiadas, mel e castanhas. Sirva imediatamente.',
          portionQuantity: 2,
          portionUnit: 'bowl',
          prepTime: 10,
          cookTime: 0,
          authorId: users[3].id
        },
        ingredients: [
          { name: 'Polpa de açaí', quantity: '400', unit: 'g' },
          { name: 'Banana congelada', quantity: '2', unit: 'unit' },
          { name: 'Granola', quantity: '100', unit: 'g' },
          { name: 'Morango', quantity: '10', unit: 'unit' },
          { name: 'Banana', quantity: '1', unit: 'unit' },
          { name: 'Mel', quantity: '2', unit: 'tablespoon' },
          { name: 'Castanhas', quantity: '50', unit: 'g' }
        ],
        categories: ['Café da Manhã', 'Saudável', 'Brasileira']
      },
      {
        data: {
          title: 'Fish and Chips',
          description: 'Clássico britânico de peixe empanado com batatas',
          image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Fish_and_chips_blackpool.jpg",
          preparation:
            'Prepare a massa misturando farinha, cerveja e sal. Corte o peixe em filés e as batatas em palitos grossos. Frite as batatas até dourar. Passe o peixe na massa e frite em óleo quente até crocante. Sirva com molho tártaro e limão.',
          portionQuantity: 4,
          portionUnit: 'serving',
          prepTime: 25,
          cookTime: 20,
          authorId: users[2].id
        },
        ingredients: [
          { name: 'Filé de bacalhau', quantity: '600', unit: 'g' },
          { name: 'Batatas', quantity: '800', unit: 'g' },
          { name: 'Farinha de trigo', quantity: '200', unit: 'g' },
          { name: 'Cerveja', quantity: '250', unit: 'ml' },
          { name: 'Fermento em pó', quantity: '1', unit: 'teaspoon' },
          { name: 'Limão', quantity: '2', unit: 'unit' },
          { name: 'Sal', quantity: '1', unit: 'teaspoon' }
        ],
        categories: ['Britânica', 'Frutos do Mar', 'Pratos Principais']
      }
    ];

    for (const recipeData of recipesData) {
      try {
        const recipe = await RecipeService.createRecipe(
          recipeData.data,
          recipeData.ingredients,
          recipeData.categories
        );
        recipes.push(recipe);
        console.log(`✅ Receita criada: ${recipe.title} (ID: ${recipe.id})`);
      } catch (error) {
        console.log(`⚠️  Erro ao criar receita ${recipeData.data.title}: ${error.message}`);
      }
    }

    console.log(`\n📊 Total de receitas criadas: ${recipes.length}\n`);

    // ==================== CRIANDO COMENTÁRIOS ====================
    console.log('💬 Criando comentários...');
    let commentsCount = 0;

    const commentsData = [
      { content: 'Amei essa receita! Ficou perfeita!', recipeIndex: 0, userIndex: 1 },
      { content: 'Fiz ontem e minha família adorou!', recipeIndex: 0, userIndex: 2 },
      { content: 'Melhor bolo de chocolate que já fiz!', recipeIndex: 0, userIndex: 3 },
      {
        content: 'Lasanha sensacional! Digna de restaurante italiano',
        recipeIndex: 1,
        userIndex: 0
      },
      { content: 'Fiz pro almoço de domingo, sucesso absoluto', recipeIndex: 1, userIndex: 4 },
      { content: 'Adorei a versão vegana! Muito criativa', recipeIndex: 2, userIndex: 1 },
      { content: 'Perfeita para um almoço leve', recipeIndex: 2, userIndex: 0 },
      { content: 'A picanha ficou no ponto exato! Dicas valiosas', recipeIndex: 3, userIndex: 2 },
      { content: 'Churrasco de domingo salvo por essa receita', recipeIndex: 3, userIndex: 0 },
      {
        content: 'Brigadeiro maravilhoso! Fiz pra festa e acabou rapidinho',
        recipeIndex: 4,
        userIndex: 3
      },
      { content: 'Cremoso na medida certa', recipeIndex: 4, userIndex: 4 },
      { content: 'Risoto divino! Textura perfeita', recipeIndex: 5, userIndex: 1 },
      { content: 'Melhor risoto que já comi fora de restaurante', recipeIndex: 5, userIndex: 3 },
      { content: 'Smoothie refrescante e saudável, ótimo pra manhã', recipeIndex: 6, userIndex: 0 },
      { content: 'Comecei a tomar todo dia no café da manhã', recipeIndex: 6, userIndex: 4 },
      { content: 'Torta linda e deliciosa!', recipeIndex: 7, userIndex: 2 },
      { content: 'O merengue ficou crocante perfeito', recipeIndex: 7, userIndex: 0 },
      {
        content: 'As panquecas ficaram super fofas! Melhor receita que já testei',
        recipeIndex: 8,
        userIndex: 0
      },
      { content: 'Perfeito para o café da manhã de domingo', recipeIndex: 8, userIndex: 2 },
      { content: 'Fiz com mel e frutas, delicioso!', recipeIndex: 8, userIndex: 3 },

      // Feijoada (índice 9)
      { content: 'Feijoada sensacional! Igualzinha da minha avó', recipeIndex: 9, userIndex: 1 },
      { content: 'Perfeita para reunir a família', recipeIndex: 9, userIndex: 3 },

      // Sushi (índice 10)
      { content: 'Primeira vez fazendo sushi, ficou ótimo!', recipeIndex: 10, userIndex: 0 },
      {
        content: 'Explicação muito clara, consegui fazer perfeitamente',
        recipeIndex: 10,
        userIndex: 4
      },

      // Brownies (índice 11)
      { content: 'Muito chocolatudo, do jeito que eu amo!', recipeIndex: 11, userIndex: 2 },
      { content: 'Acabaram em minutos na festa', recipeIndex: 11, userIndex: 4 },
      { content: 'Sabor autêntico, parece restaurante tailandês', recipeIndex: 12, userIndex: 1 },
      { content: 'Equilibrado e delicioso!', recipeIndex: 12, userIndex: 3 },
      // Quiche (índice 13)
      { content: 'Quiche perfeita para um brunch', recipeIndex: 13, userIndex: 0 },
      { content: 'Cremosa e saborosa, aprovadíssima', recipeIndex: 13, userIndex: 4 },
      // Coxinha (índice 14)
      { content: 'Melhor coxinha caseira que já comi!', recipeIndex: 14, userIndex: 1 },
      { content: 'Massa perfeita, recheio delicioso', recipeIndex: 14, userIndex: 2 },
      { content: 'Fiz 50 para a festa, sucesso absoluto', recipeIndex: 14, userIndex: 3 },
      // Mousse de Maracujá (índice 15)
      { content: 'Leve e refrescante, perfeita para o verão', recipeIndex: 15, userIndex: 0 },
      { content: 'Sobremesa favorita da família agora', recipeIndex: 15, userIndex: 4 },
      // Hambúrguer (índice 16)
      { content: 'Suculento e saboroso, melhor que fast food', recipeIndex: 16, userIndex: 1 },
      { content: 'Meus filhos adoraram!', recipeIndex: 16, userIndex: 2 },
      // Paella (índice 17)
      { content: 'Digna de um restaurante espanhol', recipeIndex: 17, userIndex: 0 },
      {
        content: 'Frutos do mar fresquinhos fizeram toda diferença',
        recipeIndex: 17,
        userIndex: 3
      },
      // Cheesecake (índice 18)
      { content: 'Textura perfeita, não rachou!', recipeIndex: 18, userIndex: 2 },
      { content: 'A calda de frutas vermelhas é divina', recipeIndex: 18, userIndex: 4 },
      // Curry Tailandês (índice 19)
      { content: 'Aromático e equilibrado, adorei', recipeIndex: 19, userIndex: 0 },
      { content: 'Nível de picância perfeito', recipeIndex: 19, userIndex: 1 },
      // Tiramisù (índice 20)
      { content: 'Melhor tiramisù que já provei fora da Itália', recipeIndex: 20, userIndex: 3 },
      { content: 'Cremoso e com sabor intenso de café', recipeIndex: 20, userIndex: 4 },
      // Tacos (índice 21)
      { content: 'Guacamole caseiro fez toda diferença', recipeIndex: 21, userIndex: 1 },
      { content: 'Autênticos e deliciosos!', recipeIndex: 21, userIndex: 2 },
      // Pão de Queijo (índice 22)
      { content: 'Sequinho por fora, macio por dentro', recipeIndex: 22, userIndex: 3 },
      { content: 'Receita da vó aprovada!', recipeIndex: 22, userIndex: 4 },
      // Ramen (índice 23)
      { content: 'Trabalhoso mas vale cada minuto', recipeIndex: 23, userIndex: 0 },
      { content: 'Caldo rico e saboroso, perfeito', recipeIndex: 23, userIndex: 1 },
      // Crème Brûlée (índice 24)
      { content: 'Casquinha crocante perfeita!', recipeIndex: 24, userIndex: 2 },
      { content: 'Impressionei os convidados', recipeIndex: 24, userIndex: 3 },
      // Strogonoff (índice 25)
      { content: 'Clássico que nunca falha', recipeIndex: 25, userIndex: 0 },
      { content: 'Cremoso e delicioso', recipeIndex: 25, userIndex: 4 },
      // Açaí Bowl (índice 26)
      { content: 'Energético e saudável, comecei o dia bem', recipeIndex: 26, userIndex: 1 },
      { content: 'Combinação de toppings perfeita', recipeIndex: 26, userIndex: 2 },
      // Fish and Chips (índice 27)
      { content: 'Crocante e sequinho, igualzinho da Inglaterra', recipeIndex: 27, userIndex: 3 },
      { content: 'Massa leve e saborosa', recipeIndex: 27, userIndex: 4 }
    ];

    for (const commentData of commentsData) {
      try {
        if (users[commentData.userIndex]) {
          await CommentService.createComment(
            commentData.content,
            commentData.recipeIndex + 1,
            users[commentData.userIndex].id
          );
          commentsCount++;
          console.log(
            `✅ Comentário criado na receita "${recipes[commentData.recipeIndex].title}"`
          );
        }
      } catch (error) {
        console.log(`⚠️  Erro ao criar comentário: ${error.message}`);
      }
    }

    console.log(`\n📊 Total de comentários criados: ${commentsCount}\n`);

    // ==================== CRIANDO LIKES ====================
    console.log('❤️  Criando likes...');
    let likesCount = 0;

    const likesData = [
      { userIndex: 1, recipeIndex: 0 },
      { userIndex: 2, recipeIndex: 0 },
      { userIndex: 3, recipeIndex: 0 },
      { userIndex: 4, recipeIndex: 0 },
      { userIndex: 0, recipeIndex: 1 },
      { userIndex: 3, recipeIndex: 1 },
      { userIndex: 4, recipeIndex: 1 },
      { userIndex: 0, recipeIndex: 2 },
      { userIndex: 1, recipeIndex: 2 },
      { userIndex: 4, recipeIndex: 2 },
      { userIndex: 0, recipeIndex: 3 },
      { userIndex: 1, recipeIndex: 3 },
      { userIndex: 2, recipeIndex: 3 },
      { userIndex: 0, recipeIndex: 4 },
      { userIndex: 2, recipeIndex: 4 },
      { userIndex: 3, recipeIndex: 4 },
      { userIndex: 0, recipeIndex: 5 },
      { userIndex: 1, recipeIndex: 5 },
      { userIndex: 4, recipeIndex: 5 },
      { userIndex: 1, recipeIndex: 6 },
      { userIndex: 2, recipeIndex: 6 },
      { userIndex: 4, recipeIndex: 6 },
      { userIndex: 1, recipeIndex: 7 },
      { userIndex: 3, recipeIndex: 7 },
      { userIndex: 4, recipeIndex: 7 },
      { userIndex: 0, recipeIndex: 8 },
      { userIndex: 2, recipeIndex: 8 },
      { userIndex: 3, recipeIndex: 8 },
      { userIndex: 4, recipeIndex: 8 },
      { userIndex: 1, recipeIndex: 9 },
      { userIndex: 2, recipeIndex: 9 },
      { userIndex: 3, recipeIndex: 9 },
      { userIndex: 0, recipeIndex: 10 },
      { userIndex: 1, recipeIndex: 10 },
      { userIndex: 3, recipeIndex: 10 },
      { userIndex: 4, recipeIndex: 10 },
      { userIndex: 0, recipeIndex: 11 },
      { userIndex: 2, recipeIndex: 11 },
      { userIndex: 3, recipeIndex: 11 },
      { userIndex: 4, recipeIndex: 11 },
      { userIndex: 1, recipeIndex: 12 },
      { userIndex: 2, recipeIndex: 12 },
      { userIndex: 3, recipeIndex: 12 },
      { userIndex: 0, recipeIndex: 13 },
      { userIndex: 1, recipeIndex: 13 },
      { userIndex: 4, recipeIndex: 13 },
      { userIndex: 0, recipeIndex: 14 },
      { userIndex: 1, recipeIndex: 14 },
      { userIndex: 2, recipeIndex: 14 },
      { userIndex: 3, recipeIndex: 14 },
      { userIndex: 4, recipeIndex: 14 },
      { userIndex: 0, recipeIndex: 15 },
      { userIndex: 1, recipeIndex: 15 },
      { userIndex: 3, recipeIndex: 15 },
      { userIndex: 4, recipeIndex: 15 },
      { userIndex: 1, recipeIndex: 16 },
      { userIndex: 2, recipeIndex: 16 },
      { userIndex: 3, recipeIndex: 16 },
      { userIndex: 0, recipeIndex: 17 },
      { userIndex: 1, recipeIndex: 17 },
      { userIndex: 3, recipeIndex: 17 },
      { userIndex: 4, recipeIndex: 17 },
      { userIndex: 0, recipeIndex: 18 },
      { userIndex: 2, recipeIndex: 18 },
      { userIndex: 3, recipeIndex: 18 },
      { userIndex: 4, recipeIndex: 18 },
      { userIndex: 0, recipeIndex: 19 },
      { userIndex: 1, recipeIndex: 19 },
      { userIndex: 2, recipeIndex: 19 },
      { userIndex: 0, recipeIndex: 20 },
      { userIndex: 1, recipeIndex: 20 },
      { userIndex: 3, recipeIndex: 20 },
      { userIndex: 4, recipeIndex: 20 },
      { userIndex: 0, recipeIndex: 21 },
      { userIndex: 1, recipeIndex: 21 },
      { userIndex: 2, recipeIndex: 21 },
      { userIndex: 4, recipeIndex: 21 },
      { userIndex: 0, recipeIndex: 22 },
      { userIndex: 1, recipeIndex: 22 },
      { userIndex: 2, recipeIndex: 22 },
      { userIndex: 3, recipeIndex: 22 },
      { userIndex: 4, recipeIndex: 22 },
      { userIndex: 0, recipeIndex: 23 },
      { userIndex: 1, recipeIndex: 23 },
      { userIndex: 3, recipeIndex: 23 },
      { userIndex: 0, recipeIndex: 24 },
      { userIndex: 2, recipeIndex: 24 },
      { userIndex: 3, recipeIndex: 24 },
      { userIndex: 4, recipeIndex: 24 },
      { userIndex: 0, recipeIndex: 25 },
      { userIndex: 1, recipeIndex: 25 },
      { userIndex: 3, recipeIndex: 25 },
      { userIndex: 4, recipeIndex: 25 },
      { userIndex: 0, recipeIndex: 26 },
      { userIndex: 1, recipeIndex: 26 },
      { userIndex: 2, recipeIndex: 26 },
      { userIndex: 4, recipeIndex: 26 },
      { userIndex: 0, recipeIndex: 27 },
      { userIndex: 1, recipeIndex: 27 },
      { userIndex: 3, recipeIndex: 27 },
      { userIndex: 4, recipeIndex: 27 },
    ];

    for (const likeData of likesData) {
      try {
        if (users[likeData.userIndex] && recipes[likeData.recipeIndex]) {
          await FeedbackService.likeRecipe(
            users[likeData.userIndex].id,
            recipes[likeData.recipeIndex].id
          );
          likesCount++;
          console.log(
            `✅ Like criado: ${users[likeData.userIndex].username} → ${recipes[likeData.recipeIndex].title}`
          );
        }
      } catch (error) {
        console.log(`⚠️  Erro ao criar like: ${error.message}`);
      }
    }

    console.log(`\n📊 Total de likes criados: ${likesCount}\n`);

    // ==================== CRIANDO RATINGS ====================
    console.log('⭐ Criando avaliações...');
    let ratingsCount = 0;

    const ratingsData = [
      { rating: 5, userIndex: 1, recipeIndex: 0 },
      { rating: 5, userIndex: 2, recipeIndex: 0 },
      { rating: 4, userIndex: 3, recipeIndex: 0 },
      { rating: 5, userIndex: 0, recipeIndex: 1 },
      { rating: 5, userIndex: 4, recipeIndex: 1 },
      { rating: 4, userIndex: 0, recipeIndex: 2 },
      { rating: 5, userIndex: 1, recipeIndex: 2 },
      { rating: 5, userIndex: 0, recipeIndex: 3 },
      { rating: 5, userIndex: 2, recipeIndex: 3 },
      { rating: 5, userIndex: 0, recipeIndex: 4 },
      { rating: 4, userIndex: 3, recipeIndex: 4 },
      { rating: 5, userIndex: 1, recipeIndex: 5 },
      { rating: 4, userIndex: 3, recipeIndex: 5 },
      { rating: 5, userIndex: 0, recipeIndex: 6 },
      { rating: 4, userIndex: 4, recipeIndex: 6 },
      { rating: 5, userIndex: 2, recipeIndex: 7 },
      { rating: 5, userIndex: 0, recipeIndex: 7 },
       // Panquecas Americanas
      { rating: 5, userIndex: 0, recipeIndex: 8 },
      { rating: 5, userIndex: 2, recipeIndex: 8 },
      { rating: 4, userIndex: 3, recipeIndex: 8 },
      // Feijoada
      { rating: 5, userIndex: 1, recipeIndex: 9 },
      { rating: 5, userIndex: 3, recipeIndex: 9 },
      // Sushi
      { rating: 4, userIndex: 0, recipeIndex: 10 },
      { rating: 5, userIndex: 4, recipeIndex: 10 },
      // Brownies
      { rating: 5, userIndex: 2, recipeIndex: 11 },
      { rating: 5, userIndex: 4, recipeIndex: 11 },
      // Pad Thai
      { rating: 5, userIndex: 1, recipeIndex: 12 },
      { rating: 4, userIndex: 3, recipeIndex: 12 },
      // Quiche
      { rating: 4, userIndex: 0, recipeIndex: 13 },
      { rating: 5, userIndex: 4, recipeIndex: 13 },
      // Coxinha
      { rating: 5, userIndex: 1, recipeIndex: 14 },
      { rating: 5, userIndex: 2, recipeIndex: 14 },
      { rating: 5, userIndex: 3, recipeIndex: 14 },
      // Mousse de Maracujá
      { rating: 5, userIndex: 0, recipeIndex: 15 },
      { rating: 4, userIndex: 4, recipeIndex: 15 },
      // Hambúrguer
      { rating: 5, userIndex: 1, recipeIndex: 16 },
      { rating: 4, userIndex: 2, recipeIndex: 16 },
      // Paella
      { rating: 5, userIndex: 0, recipeIndex: 17 },
      { rating: 5, userIndex: 3, recipeIndex: 17 },
      // Cheesecake
      { rating: 5, userIndex: 2, recipeIndex: 18 },
      { rating: 5, userIndex: 4, recipeIndex: 18 },
      // Curry Tailandês
      { rating: 4, userIndex: 0, recipeIndex: 19 },
      { rating: 5, userIndex: 1, recipeIndex: 19 },
      // Tiramisù
      { rating: 5, userIndex: 3, recipeIndex: 20 },
      { rating: 5, userIndex: 4, recipeIndex: 20 },
      // Tacos
      { rating: 5, userIndex: 1, recipeIndex: 21 },
      { rating: 4, userIndex: 2, recipeIndex: 21 },
      // Pão de Queijo
      { rating: 5, userIndex: 3, recipeIndex: 22 },
      { rating: 5, userIndex: 4, recipeIndex: 22 },
      // Ramen
      { rating: 5, userIndex: 0, recipeIndex: 23 },
      { rating: 5, userIndex: 1, recipeIndex: 23 },
      // Crème Brûlée
      { rating: 5, userIndex: 2, recipeIndex: 24 },
      { rating: 4, userIndex: 3, recipeIndex: 24 },
      // Strogonoff
      { rating: 5, userIndex: 0, recipeIndex: 25 },
      { rating: 4, userIndex: 4, recipeIndex: 25 },
      // Açaí Bowl
      { rating: 4, userIndex: 1, recipeIndex: 26 },
      { rating: 5, userIndex: 2, recipeIndex: 26 },
      // Fish and Chips
      { rating: 5, userIndex: 3, recipeIndex: 27 },
      { rating: 4, userIndex: 4, recipeIndex: 27 }
    ];

    for (const ratingData of ratingsData) {
      try {
        if (users[ratingData.userIndex] && recipes[ratingData.recipeIndex]) {
          await FeedbackService.rateRecipe(
            ratingData.rating,
            users[ratingData.userIndex].id,
            recipes[ratingData.recipeIndex].id
          );
          ratingsCount++;
          console.log(
            `✅ Avaliação criada: ${ratingData.rating}⭐ por ${users[ratingData.userIndex].username} → ${recipes[ratingData.recipeIndex].title}`
          );
        }
      } catch (error) {
        console.log(`⚠️  Erro ao criar avaliação: ${error.message}`);
      }
    }

    console.log(`\n📊 Total de avaliações criadas: ${ratingsCount}\n`);

    // ==================== RESUMO FINAL ====================
    console.log('✨ ==================== RESUMO ====================');
    console.log(`👥 Usuários criados: ${users.length}`);
    console.log(`🍳 Receitas criadas: ${recipes.length}`);
    console.log(`💬 Comentários criados: ${commentsCount}`);
    console.log(`❤️  Likes criados: ${likesCount}`);
    console.log(`⭐ Avaliações criadas: ${ratingsCount}`);
    console.log('===================================================');
    console.log('\n✅ Seed concluído com sucesso!');
    console.log('⚠️  IMPORTANTE: Remova este arquivo agora para evitar reexecução!\n');
  } catch (error) {
    console.error('\n❌ Erro durante o seed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

export default seedDatabase;
