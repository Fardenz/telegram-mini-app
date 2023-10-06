import { createBrowserRouter } from "react-router-dom"
import { COIN_GAME, HOME, DICE_GAME } from './paths';
import PublicRoute from "./PublicRoute"
import HomeView from "@views/Home"
import CoinFlipView from "@views/Games/Coinflip"
import MainLayout from "@layouts/MainLayout"
import DiceView from '@views/Games/Dice/index';

const Router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <MainLayout>
          <PublicRoute />
        </MainLayout>
      ),
      children: [
        {
          path: HOME,
          element: <HomeView />,
        },
      ],
    },
    {
      path: "/game",
      element: (
        <MainLayout>
          <PublicRoute />
        </MainLayout>
      ),
      children: [
        {
          path: COIN_GAME,
          element: <CoinFlipView />,
        },
        {
          path: DICE_GAME,
          element: <DiceView />,
        }
      ],
    }
  ],
  {
    basename: "/telegram-mini-app/",
  }
)

export { Router }
