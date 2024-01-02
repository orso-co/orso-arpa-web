import { isDevMode } from "@angular/core";
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { CoreAppConfig } from "./core.module.config";

export function createApollo(httpLink: HttpLink, config: CoreAppConfig) {
  const { protocol, baseUrl } = config.graphql!;
  const uri = `${protocol}://${baseUrl}`;
  const basic = setContext(() => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const link = ApolloLink.from([basic, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
    connectToDevTools: isDevMode(),
  };
}
