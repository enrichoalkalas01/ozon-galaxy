@Library('deployment-library@main') _

// ozon-galaxy — DEV only. No build-time env (no NEXT_PUBLIC_*), so runtime ESO.
deployPipelineVaultEso(
    gitRepository: 'https://github.com/enrichoalkalas01/ozon-galaxy.git',
    gitBranch: 'master',
    gitCredentialsId: 'github-credentials',

    registryUrl: '192.168.20.21',
    registryCredentialsId: 'harbor-credentials',
    imageName: 'ozon-galaxy-dev',
    imageFolder: 'other',

    namespace: 'portofolio',
    helmValuesFile: 'values/values.dev.yml',
    servicePort: '31171',

    vaultRuntimePath: 'ozon-galaxy-dev',
    vaultRuntimeStoreName: 'vault-backend',
    vaultRuntimeRefreshInterval: '1m',
)
