import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { ApolloClient, InMemoryCache } from '@apollo/client';


import { ApolloProvider } from '@apollo/react-hooks'
// Initialize Apollo Client
const ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2Njc3MzM5NzEsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2xhM3ltYXAzMzYzeTAxdXBhcWl5Y2VkZC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMTY1OTM5NjEtMjk4OS00NzY2LThlOTYtODYyYjljNDU5YTMzIiwianRpIjoiY2xhNTlxd2htNDFucjAxdWloN3BqMnM1YSJ9.PxY-z-rALCkqmew0g4oozcvc0hQiVDIApipMaH_MH37wPZNsHsYaWOas2lV7vxydpisPPUjW4XzUpMekoYYLwltFtqEPxgpswcuzGEIHCKJqoRuTA-RIPR2JbRTP8Yi_j4cmP7giYxQVkEPZ8ihzkv0fzLJWY8ni9KGBagXOu3gKA4s7s3ZzKAXkijyqdm2E5hzuuanhPv1JGR6_hZlByUnEgm4MfCwxiV-0cBHOGcfu2KBA8SsRzxpZkbZWYNs0xUPXqekBCoXG9pmr6zgsTlU-GQJH-0oKKzVj0jPwRl8HdmnM7Fwv4mNNsLhQIDsl7AXtbrY10Jny7GpKSXf5V6BIGDXXsiGqTuKg3No8Y6lDouszBejkSsUH76iVvSWG6vpLTBYSAmb3EekB5ZQ-oAJq-sIF8S6t13VW0WdTKNMVpRdiCt2M7IS3j17PB1DAfwlaAIeAvrNKoVNRAZoRjq7HZ1Vf7JQUZl7PFOQ0Bk8z6CJ-4CSri9LOpMkAx2BPalQRsgU4Io_pITX_qJ_q1vyVif2VYt-1BROgTjPa-Ja36z8rEovswuaa3Bs-2XYlcP9aRptdgB_190Jyjd0WjFywscxpQgK6-IszyWGQuCNd15qExOGWHc7ntONXSu5lrmMXAca6qup0zFJiUmCqUp9yed-Xe0Tk26MLX-159gA";
const client = new ApolloClient({
  uri: 'https://api-sa-east-1.hygraph.com/v2/cla3ymap3363y01upaqiycedd/master',
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  console.log("teste")

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar animated={true} style={'light'} />
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
