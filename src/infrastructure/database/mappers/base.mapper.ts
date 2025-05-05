export abstract class BaseMapper<DomainEntity, OrmEntity> {
    abstract toDomain(ormEntity: OrmEntity): DomainEntity;
    abstract toOrm(domainEntity: DomainEntity): OrmEntity;
    
    toDomainList(ormEntities: OrmEntity[]): DomainEntity[] {
      return ormEntities.map(entity => this.toDomain(entity));
    }
    
    toOrmList(domainEntities: DomainEntity[]): OrmEntity[] {
      return domainEntities.map(entity => this.toOrm(entity));
    }
  }